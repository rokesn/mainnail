import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PAYPAL_API = 'https://api-m.paypal.com';

async function getAccessToken() {
  const clientId = 'AbWNHhpliE8_4lwPRMhlLOspJy7V4ESbLZB1ZHVomVK9US329PK3ZQgDpYPD8iTtm0ytsdAoiKAxsuMB';
  const secretKey = Deno.env.get('PAYPAL_SECRET_KEY');
  if (!secretKey) throw new Error('PAYPAL_SECRET_KEY not configured');

  const auth = btoa(`${clientId}:${secretKey}`);
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`PayPal auth failed [${res.status}]: ${errText}`);
  }

  const data = await res.json();
  return data.access_token;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, currency = 'EUR', orderNumber } = await req.json();

    if (!amount || !orderNumber) {
      return new Response(JSON.stringify({ error: 'Missing amount or orderNumber' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const accessToken = await getAccessToken();

    const res = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          reference_id: orderNumber,
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
        }],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`PayPal create order failed [${res.status}]: ${errText}`);
    }

    const order = await res.json();
    return new Response(JSON.stringify({ id: order.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Create PayPal order error:', error);
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
