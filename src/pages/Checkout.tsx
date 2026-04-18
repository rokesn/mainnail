import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import PayPalButton from "@/components/checkout/PayPalButton";
import OrderSummary from "@/components/checkout/OrderSummary";

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [form, setForm] = useState({
    nome: "", cognome: "", email: "", telefono: "",
    indirizzo: "", cap: "", citta: "", provincia: "", note: "",
    password: "",
  });

  const orderNumber = useMemo(() => `FUP-${Math.floor(1000 + Math.random() * 9000)}`, []);

  useEffect(() => {
    if (user && profile) {
      setForm(prev => ({
        ...prev,
        nome: profile.nome || prev.nome,
        cognome: profile.cognome || prev.cognome,
        email: user.email || prev.email,
        telefono: profile.telefono || prev.telefono,
        indirizzo: profile.indirizzo || prev.indirizzo,
        cap: profile.cap || prev.cap,
        citta: profile.citta || prev.citta,
        provincia: profile.provincia || prev.provincia,
      }));
    }
  }, [user, profile]);

  // Validate form
  useEffect(() => {
    const requiredFilled = form.nome && form.cognome && form.email && form.telefono && form.indirizzo && form.cap && form.citta && form.provincia;
    const passwordOk = user ? true : (form.password && form.password.length >= 6);
    setFormValid(!!(requiredFilled && passwordOk));
  }, [form, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePaymentSuccess = async (paypalDetails: any) => {
    setLoading(true);
    try {
      let userId = user?.id || null;

      // If not logged in, create account
      if (!userId) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { nome: form.nome, cognome: form.cognome },
          },
        });

        if (signUpError) {
          if (signUpError.message.includes("already registered") || signUpError.message.includes("already been registered")) {
            const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
              email: form.email,
              password: form.password,
            });
            if (signInError) {
              toast({ title: "Errore", description: "Email già registrata. Password errata.", variant: "destructive" });
              setLoading(false);
              return;
            }
            userId = signInData.user?.id || null;
          } else {
            toast({ title: "Errore", description: signUpError.message, variant: "destructive" });
            setLoading(false);
            return;
          }
        } else if (signUpData.user) {
          userId = signUpData.user.id;
        }

        if (userId) {
          await supabase.from("profiles" as any).update({
            nome: form.nome, cognome: form.cognome, telefono: form.telefono,
            indirizzo: form.indirizzo, cap: form.cap, citta: form.citta, provincia: form.provincia,
          }).eq("user_id", userId);
        }
      }

      // Save order
      const orderItems = items.map(item => ({
        productId: item.product.id,
        variantId: item.variant?.id || null,
        name: item.variant ? `${item.product.name} - ${item.variant.name}` : item.product.name,
        image: item.variant?.image_url || item.product.mainImage,
        price: item.variant?.price || item.product.price,
        quantity: item.quantity,
      }));

      const { error: orderError } = await supabase.from("orders" as any).insert({
        order_number: orderNumber,
        user_id: userId,
        customer_name: `${form.nome} ${form.cognome}`,
        customer_email: form.email,
        customer_phone: form.telefono,
        shipping_address: form.indirizzo,
        shipping_cap: form.cap,
        shipping_city: form.citta,
        shipping_province: form.provincia,
        notes: form.note || null,
        items: orderItems,
        total: totalPrice,
        status: "pagato",
      });

      if (orderError) throw orderError;

      clearCart();
      toast({ title: `✓ Ordine ${orderNumber} confermato!`, description: "Pagamento ricevuto. Controlla il tuo account." });
      navigate(`/ordine-confermato?ordine=${orderNumber}&email=${encodeURIComponent(form.email)}&nuovo=${userId && !user ? "1" : "0"}`);
    } catch (err: any) {
      console.error("Checkout error:", err);
      toast({ title: "Errore", description: "Si è verificato un errore nel salvataggio dell'ordine. Riprova.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentError = () => {
    toast({ title: "Pagamento fallito", description: "Il pagamento non è andato a buon fine. Riprova.", variant: "destructive" });
  };

  if (items.length === 0) {
    return (
      <>
        <AnnouncementBar />
        <Navbar />
        <div className="min-h-screen bg-cream flex items-center justify-center pt-24">
          <div className="text-center">
            <span className="text-5xl block mb-4">🛒</span>
            <p className="font-sans text-muted-foreground">Il carrello è vuoto.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const inputClass = "w-full border border-border rounded-md px-4 py-2.5 font-sans text-sm bg-background focus:outline-none focus:border-gold transition-colors";

  return (
    <>
      <Helmet>
        <title>Checkout | fresaunghie.store</title>
        <meta name="robots" content="noindex, nofollow" />
        <script src="https://www.paypal.com/sdk/js?client-id=AbWNHhpliE8_4lwPRMhlLOspJy7V4ESbLZB1ZHVomVK9US329PK3ZQgDpYPD8iTtm0ytsdAoiKAxsuMB&currency=EUR&intent=capture&locale=it_IT" defer></script>
      </Helmet>
      <AnnouncementBar />
      <Navbar />
      <main className="bg-cream pt-24 md:pt-32 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {/* Shipping form */}
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: "nome", label: "Nome" },
                  { name: "cognome", label: "Cognome" },
                  { name: "email", label: "Email", type: "email" },
                  { name: "telefono", label: "Telefono", type: "tel" },
                ].map(field => (
                  <div key={field.name}>
                    <label className="text-sm font-sans font-semibold text-foreground block mb-1">{field.label} *</label>
                    <input
                      name={field.name}
                      type={field.type || "text"}
                      required
                      value={(form as any)[field.name]}
                      onChange={handleChange}
                      disabled={!!user && field.name === "email"}
                      className={`${inputClass} disabled:opacity-60`}
                    />
                  </div>
                ))}
              </div>

              {!user && (
                <div className="bg-gold/10 border border-gold/30 rounded-xl p-4">
                  <p className="text-sm font-sans font-semibold text-foreground mb-2">🔐 Crea il tuo Account</p>
                  <p className="text-xs text-muted-foreground font-sans mb-3">
                    Inserisci una password per creare il tuo account e tracciare i tuoi ordini.
                  </p>
                  <div>
                    <label className="text-sm font-sans font-semibold text-foreground block mb-1">Password *</label>
                    <input
                      name="password"
                      type="password"
                      required
                      minLength={6}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Minimo 6 caratteri"
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-sm font-sans font-semibold text-foreground block mb-1">Indirizzo *</label>
                <input name="indirizzo" required value={form.indirizzo} onChange={handleChange} className={inputClass} />
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-sans font-semibold text-foreground block mb-1">CAP *</label>
                  <input name="cap" required value={form.cap} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="text-sm font-sans font-semibold text-foreground block mb-1">Città *</label>
                  <input name="citta" required value={form.citta} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="text-sm font-sans font-semibold text-foreground block mb-1">Provincia *</label>
                  <input name="provincia" required value={form.provincia} onChange={handleChange} className={inputClass} />
                </div>
              </div>

              <div>
                <label className="text-sm font-sans font-semibold text-foreground block mb-1">Note aggiuntive</label>
                <textarea name="note" value={form.note} onChange={handleChange} rows={3} className={`${inputClass} resize-none`} />
              </div>

              {/* Payment Section */}
              <div className="bg-background border border-border rounded-xl p-6 space-y-4">
                <h2 className="font-serif text-xl font-bold text-foreground">💳 Pagamento Sicuro</h2>
                <p className="text-xs text-muted-foreground font-sans">
                  Paga in sicurezza con PayPal, carta di credito o debito.
                </p>
                {!formValid && (
                  <p className="text-sm text-destructive font-sans font-semibold">
                    ⚠️ Compila tutti i campi obbligatori per procedere al pagamento.
                  </p>
                )}
                <PayPalButton
                  amount={totalPrice}
                  orderNumber={orderNumber}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  disabled={!formValid || loading}
                />
                {loading && (
                  <p className="text-sm text-muted-foreground font-sans text-center animate-pulse">
                    Elaborazione ordine...
                  </p>
                )}
              </div>
            </div>

            {/* Summary */}
            <OrderSummary items={items} totalPrice={totalPrice} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CheckoutPage;
