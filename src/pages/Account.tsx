import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Package, Truck, User, Heart, LogOut } from "lucide-react";

const statusLabels: Record<string, { label: string; color: string }> = {
  in_attesa: { label: "In Attesa", color: "bg-yellow-100 text-yellow-800" },
  confermato: { label: "Confermato", color: "bg-blue-100 text-blue-800" },
  in_preparazione: { label: "In Preparazione", color: "bg-orange-100 text-orange-800" },
  spedito: { label: "Spedito", color: "bg-purple-100 text-purple-800" },
  consegnato: { label: "Consegnato", color: "bg-green-100 text-green-800" },
};

const AccountPage = () => {
  const { user, loading: authLoading, profile, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { items: wishlistIds } = useWishlist();
  const { addItem } = useCart();
  const [tab, setTab] = useState<"ordini" | "traccia" | "dati" | "wishlist">("ordini");
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [profileForm, setProfileForm] = useState({ nome: "", cognome: "", telefono: "", indirizzo: "", cap: "", citta: "", provincia: "" });
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate("/accedi");
  }, [authLoading, user]);

  useEffect(() => {
    if (profile) {
      setProfileForm({
        nome: profile.nome || "",
        cognome: profile.cognome || "",
        telefono: profile.telefono || "",
        indirizzo: profile.indirizzo || "",
        cap: profile.cap || "",
        citta: profile.citta || "",
        provincia: profile.provincia || "",
      });
    }
  }, [profile]);

  useEffect(() => {
    if (user) {
      supabase.from("orders" as any).select("*").eq("user_id", user.id).order("created_at", { ascending: false }).then(({ data }) => {
        setOrders(data || []);
        setLoadingOrders(false);
      });
    }
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    await supabase.from("profiles" as any).update(profileForm).eq("user_id", user.id);
    if (newPassword.length > 0) {
      if (newPassword.length < 6) {
        toast({ title: "Errore", description: "Password minimo 6 caratteri.", variant: "destructive" });
        setSaving(false);
        return;
      }
      await supabase.auth.updateUser({ password: newPassword });
      setNewPassword("");
    }
    await refreshProfile();
    setSaving(false);
    toast({ title: "✓ Dati aggiornati!" });
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading) return <div className="min-h-screen bg-cream flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-gold border-t-transparent rounded-full" /></div>;

  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));

  const tabs = [
    { key: "ordini" as const, label: "I Miei Ordini", icon: Package },
    { key: "traccia" as const, label: "Traccia Pacco", icon: Truck },
    { key: "dati" as const, label: "Dati Personali", icon: User },
    { key: "wishlist" as const, label: "Wishlist", icon: Heart },
  ];

  const orderSteps = ["in_attesa", "confermato", "in_preparazione", "spedito", "consegnato"];

  return (
    <>
      <Helmet>
        <title>Il Mio Account | Fresa Unghie Pro</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navbar />
      <main className="bg-cream pt-24 md:pt-32 pb-16 px-4 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-serif text-3xl font-bold text-foreground">Il Mio Account</h1>
            <button onClick={handleLogout} className="flex items-center gap-2 text-muted-foreground hover:text-destructive transition-colors font-sans text-sm">
              <LogOut size={16} /> Esci
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-sans text-sm transition-colors ${tab === t.key ? "bg-gold text-nero font-semibold" : "bg-background border border-border text-muted-foreground hover:border-gold"}`}>
                <t.icon size={16} /> {t.label}
              </button>
            ))}
          </div>

          {tab === "ordini" && (
            <div className="space-y-4">
              {loadingOrders ? (
                <div className="text-center py-12"><div className="animate-spin w-8 h-8 border-4 border-gold border-t-transparent rounded-full mx-auto" /></div>
              ) : orders.length === 0 ? (
                <p className="text-center py-12 text-muted-foreground font-sans">Nessun ordine ancora.</p>
              ) : orders.map(order => (
                <div key={order.id} className="bg-background border border-border rounded-xl p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="font-sans font-bold text-foreground">Ordine #{order.order_number}</p>
                      <p className="text-sm text-muted-foreground font-sans">{new Date(order.created_at).toLocaleDateString("it-IT")}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-sans font-semibold ${statusLabels[order.status]?.color || "bg-gray-100 text-gray-800"}`}>
                        {statusLabels[order.status]?.label || order.status}
                      </span>
                      <span className="font-sans font-bold text-gold-dark">€{Number(order.total).toFixed(2).replace(".", ",")}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {(order.items as any[]).map((item: any, i: number) => (
                      <div key={i} className="flex items-center gap-2">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                        <div>
                          <p className="text-sm font-sans font-semibold">{item.name}</p>
                          <p className="text-xs text-muted-foreground font-sans">Qtà: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "traccia" && (
            <div className="space-y-6">
              {orders.length === 0 ? (
                <p className="text-center py-12 text-muted-foreground font-sans">Nessun ordine da tracciare.</p>
              ) : orders.map(order => (
                <div key={order.id} className="bg-background border border-border rounded-xl p-6">
                  <p className="font-sans font-bold text-foreground mb-4">Ordine #{order.order_number}</p>
                  <div className="flex items-center gap-1 mb-4">
                    {orderSteps.map((step, i) => {
                      const currentIdx = orderSteps.indexOf(order.status);
                      const active = i <= currentIdx;
                      return (
                        <div key={step} className="flex-1 flex flex-col items-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${active ? "bg-gold text-nero" : "bg-muted text-muted-foreground"}`}>
                            {i + 1}
                          </div>
                          <p className="text-xs font-sans mt-1 text-center">{statusLabels[step]?.label}</p>
                          {i < orderSteps.length - 1 && <div className={`h-0.5 w-full mt-1 ${active ? "bg-gold" : "bg-muted"}`} />}
                        </div>
                      );
                    })}
                  </div>
                  {order.status === "spedito" && order.tracking_url ? (
                    <a href={order.tracking_url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gold text-nero px-6 py-2 rounded-md font-sans font-semibold hover:bg-gold-light transition-colors">
                      📦 Traccia il tuo pacco →
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground font-sans">
                      {order.status === "consegnato" ? "✅ Ordine consegnato!" : "Il tuo ordine è in preparazione. Consegna stimata entro 7 giorni lavorativi."}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {tab === "dati" && (
            <div className="bg-background border border-border rounded-xl p-6 max-w-lg">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[{ name: "nome", label: "Nome" }, { name: "cognome", label: "Cognome" }].map(f => (
                    <div key={f.name}>
                      <label className="text-sm font-sans font-semibold text-foreground block mb-1">{f.label}</label>
                      <input value={(profileForm as any)[f.name]} onChange={e => setProfileForm(prev => ({ ...prev, [f.name]: e.target.value }))}
                        className="w-full border border-border rounded-md px-4 py-2.5 font-sans text-sm bg-background focus:outline-none focus:border-gold transition-colors" />
                    </div>
                  ))}
                </div>
                {[
                  { name: "telefono", label: "Telefono" },
                  { name: "indirizzo", label: "Indirizzo" },
                ].map(f => (
                  <div key={f.name}>
                    <label className="text-sm font-sans font-semibold text-foreground block mb-1">{f.label}</label>
                    <input value={(profileForm as any)[f.name]} onChange={e => setProfileForm(prev => ({ ...prev, [f.name]: e.target.value }))}
                      className="w-full border border-border rounded-md px-4 py-2.5 font-sans text-sm bg-background focus:outline-none focus:border-gold transition-colors" />
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-4">
                  {[{ name: "cap", label: "CAP" }, { name: "citta", label: "Città" }, { name: "provincia", label: "Provincia" }].map(f => (
                    <div key={f.name}>
                      <label className="text-sm font-sans font-semibold text-foreground block mb-1">{f.label}</label>
                      <input value={(profileForm as any)[f.name]} onChange={e => setProfileForm(prev => ({ ...prev, [f.name]: e.target.value }))}
                        className="w-full border border-border rounded-md px-4 py-2.5 font-sans text-sm bg-background focus:outline-none focus:border-gold transition-colors" />
                    </div>
                  ))}
                </div>
                <hr className="border-border" />
                <div>
                  <label className="text-sm font-sans font-semibold text-foreground block mb-1">Nuova Password (opzionale)</label>
                  <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Lascia vuoto per non cambiare"
                    className="w-full border border-border rounded-md px-4 py-2.5 font-sans text-sm bg-background focus:outline-none focus:border-gold transition-colors" />
                </div>
                <button onClick={handleSaveProfile} disabled={saving}
                  className="w-full bg-gold text-nero py-3 rounded-md font-sans font-bold hover:bg-gold-light transition-colors disabled:opacity-50">
                  {saving ? "Salvataggio..." : "Salva Modifiche"}
                </button>
              </div>
            </div>
          )}

          {tab === "wishlist" && (
            <div className="grid sm:grid-cols-2 gap-6">
              {wishlistProducts.length === 0 ? (
                <p className="text-center py-12 text-muted-foreground font-sans col-span-2">La tua wishlist è vuota.</p>
              ) : wishlistProducts.map(p => (
                <div key={p.id} className="bg-background border border-border rounded-xl p-4 flex gap-4">
                  <img src={p.mainImage} alt={p.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1">
                    <p className="font-sans font-semibold text-foreground">{p.name}</p>
                    <p className="text-gold-dark font-sans font-bold">{p.priceFormatted}</p>
                    <button onClick={() => addItem(p)} className="mt-2 bg-gold text-nero px-4 py-1.5 rounded-md font-sans text-sm font-semibold hover:bg-gold-light transition-colors">
                      Aggiungi al Carrello
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AccountPage;
