import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { BarChart3, ShoppingCart, Star, Users, Mail, Settings, LogOut, Save, Package, PlusCircle, Palette, FileText } from "lucide-react";
import ProductMediaManager from "@/components/admin/ProductMediaManager";
import ProductVariantManager from "@/components/admin/ProductVariantManager";
import ProductDescriptionBuilder from "@/components/admin/ProductDescriptionBuilder";
import { products } from "@/data/products";
import { Helmet } from "react-helmet-async";

const statusOptions = ["in_attesa", "confermato", "in_preparazione", "spedito", "consegnato"];
const statusLabels: Record<string, string> = {
  in_attesa: "🟡 Pending", confermato: "🔵 Confirmed", in_preparazione: "🟠 Preparing",
  spedito: "🚚 Shipped", consegnato: "✅ Delivered",
};
const reviewStatusLabels: Record<string, string> = { pending: "Pending", approved: "Approved", rejected: "Rejected" };

const AddReviewForm = ({ onAdded }: { onAdded: () => void }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [photoUrls, setPhotoUrls] = useState<string[]>([""]);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [productId, setProductId] = useState(products[0].id);
  const [saving, setSaving] = useState(false);
  const [reviewDate, setReviewDate] = useState("");

  const addPhotoField = () => setPhotoUrls(prev => [...prev, ""]);
  const removePhotoField = (idx: number) => setPhotoUrls(prev => prev.filter((_, i) => i !== idx));
  const updatePhotoUrl = (idx: number, val: string) => setPhotoUrls(prev => prev.map((u, i) => i === idx ? val : u));

  const handleSubmit = async () => {
    if (!name.trim() || !text.trim()) return;
    setSaving(true);
    const validPhotos = photoUrls.map(u => u.trim()).filter(Boolean);
    const insertData: any = {
      user_name: name.trim(),
      user_email: email.trim() || "admin@manual.com",
      rating,
      text: text.trim(),
      photo_url: validPhotos.length > 0 ? validPhotos.join("|||") : null,
      profile_pic_url: profilePicUrl.trim() || null,
      product_id: productId,
      status: "approved",
    };
    if (reviewDate) {
      insertData.created_at = new Date(reviewDate).toISOString();
    }
    const { error } = await supabase.from("reviews" as any).insert(insertData);
    setSaving(false);
    if (error) {
      toast({ title: "Error adding review", variant: "destructive" });
      return;
    }
    toast({ title: "✓ Review added & approved" });
    setName(""); setEmail(""); setRating(5); setText(""); setPhotoUrls([""]); setProfilePicUrl(""); setReviewDate("");
    setOpen(false);
    onAdded();
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="mb-6 bg-gold text-nero px-4 py-2 rounded-md font-sans text-sm font-semibold hover:bg-gold-light transition-colors flex items-center gap-2">
        <PlusCircle size={16} /> Add Review Manually
      </button>
    );
  }

  return (
    <div className="bg-nero-card border border-gold/10 rounded-xl p-6 mb-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-cream font-sans font-semibold">Add Review Manually</p>
        <button onClick={() => setOpen(false)} className="text-cream/40 hover:text-cream text-sm font-sans">Cancel</button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-cream/60 text-xs font-sans block mb-1">Customer Name *</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Maria Rossi"
            className="w-full bg-nero border border-gold/20 text-cream rounded-md px-3 py-2 text-sm font-sans" />
        </div>
        <div>
          <label className="text-cream/60 text-xs font-sans block mb-1">Email (optional)</label>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com"
            className="w-full bg-nero border border-gold/20 text-cream rounded-md px-3 py-2 text-sm font-sans" />
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="text-cream/60 text-xs font-sans block mb-1">Product</label>
          <select value={productId} onChange={e => setProductId(e.target.value)}
            className="w-full bg-nero border border-gold/20 text-cream rounded-md px-3 py-2 text-sm font-sans">
            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-cream/60 text-xs font-sans block mb-1">Rating</label>
          <div className="flex gap-1 mt-1">
            {[1, 2, 3, 4, 5].map(r => (
              <button key={r} onClick={() => setRating(r)} className="text-2xl">
                <span className={r <= rating ? "text-gold" : "text-cream/20"}>★</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-cream/60 text-xs font-sans block mb-1">Review Date (optional)</label>
          <input type="date" value={reviewDate} onChange={e => setReviewDate(e.target.value)}
            className="w-full bg-nero border border-gold/20 text-cream rounded-md px-3 py-2 text-sm font-sans" />
          <p className="text-cream/30 text-xs font-sans mt-1">Leave empty for today</p>
        </div>
      </div>
      <div>
        <label className="text-cream/60 text-xs font-sans block mb-1">Review Text *</label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={3} placeholder="What did the customer say..."
          className="w-full bg-nero border border-gold/20 text-cream rounded-md px-3 py-2 text-sm font-sans" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-cream/60 text-xs font-sans block mb-1">Profile Picture URL (optional)</label>
          <input value={profilePicUrl} onChange={e => setProfilePicUrl(e.target.value)} placeholder="https://avatar..."
            className="w-full bg-nero border border-gold/20 text-cream rounded-md px-3 py-2 text-sm font-sans" />
          {profilePicUrl && <img src={profilePicUrl} alt="Avatar" className="mt-2 w-10 h-10 rounded-full object-cover" />}
        </div>
      </div>
      <div>
        <label className="text-cream/60 text-xs font-sans block mb-1">Review Photos (optional)</label>
        {photoUrls.map((url, idx) => (
          <div key={idx} className="flex gap-2 items-center mb-2">
            <input value={url} onChange={e => updatePhotoUrl(idx, e.target.value)} placeholder="https://image-url..."
              className="flex-1 bg-nero border border-gold/20 text-cream rounded-md px-3 py-2 text-sm font-sans" />
            {photoUrls.length > 1 && (
              <button onClick={() => removePhotoField(idx)} className="text-red-400 hover:text-red-300 text-sm font-sans">✕</button>
            )}
          </div>
        ))}
        <button onClick={addPhotoField} className="text-gold/70 hover:text-gold text-xs font-sans mt-1">+ Add another photo</button>
        <div className="flex gap-2 mt-2 flex-wrap">
          {photoUrls.filter(u => u.trim()).map((url, idx) => (
            <img key={idx} src={url} alt="Preview" className="w-16 h-16 rounded-lg object-cover" />
          ))}
        </div>
      </div>
      <button onClick={handleSubmit} disabled={saving || !name.trim() || !text.trim()}
        className="bg-gold text-nero px-6 py-2 rounded-md font-sans text-sm font-semibold hover:bg-gold-light transition-colors disabled:opacity-50">
        {saving ? "Saving..." : "Add & Approve Review"}
      </button>
    </div>
  );
};

const AdminPage = () => {
  const { user, isAdmin, adminChecked, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"overview" | "orders" | "reviews" | "users" | "newsletter" | "settings" | "products" | "variants" | "description">("overview");
  const [orders, setOrders] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [newsletter, setNewsletter] = useState<any[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [orderFilter, setOrderFilter] = useState("all");
  const [reviewFilter, setReviewFilter] = useState("all");
  const [loadingData, setLoadingData] = useState(true);
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!authLoading && adminChecked && (!user || !isAdmin)) navigate("/accedi");
  }, [authLoading, user, isAdmin, adminChecked]);

  useEffect(() => {
    if (isAdmin) loadAllData();
  }, [isAdmin]);

  const loadAllData = async () => {
    setLoadingData(true);
    const [ordersRes, reviewsRes, usersRes, newsletterRes, settingsRes] = await Promise.all([
      supabase.from("orders" as any).select("*").order("created_at", { ascending: false }),
      supabase.from("reviews" as any).select("*").order("created_at", { ascending: false }),
      supabase.from("profiles" as any).select("*").order("created_at", { ascending: false }),
      supabase.from("newsletter" as any).select("*").order("created_at", { ascending: false }),
      supabase.from("settings" as any).select("*"),
    ]);
    setOrders(ordersRes.data || []);
    setReviews(reviewsRes.data || []);
    setUsers(usersRes.data || []);
    setNewsletter(newsletterRes.data || []);
    const s: Record<string, string> = {};
    (settingsRes.data || []).forEach((r: any) => { s[r.key] = r.value; });
    setSettings(s);
    const ti: Record<string, string> = {};
    (ordersRes.data || []).forEach((o: any) => { ti[o.id] = o.tracking_url || ""; });
    setTrackingInputs(ti);
    setLoadingData(false);
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    await supabase.from("orders" as any).update({ status }).eq("id", orderId);
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    toast({ title: `✓ Status updated: ${statusLabels[status]}` });
  };

  const saveTrackingUrl = async (orderId: string) => {
    const url = trackingInputs[orderId] || "";
    await supabase.from("orders" as any).update({ tracking_url: url }).eq("id", orderId);
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, tracking_url: url } : o));
    toast({ title: "✓ Tracking ID saved!" });
  };

  const updateReviewStatus = async (reviewId: string, status: string) => {
    await supabase.from("reviews" as any).update({ status }).eq("id", reviewId);
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status } : r));
    toast({ title: `✓ Review ${reviewStatusLabels[status]?.toLowerCase()}` });
  };

  const deleteReview = async (reviewId: string) => {
    await supabase.from("reviews" as any).delete().eq("id", reviewId);
    setReviews(prev => prev.filter(r => r.id !== reviewId));
    toast({ title: "✓ Review deleted" });
  };

  const saveSetting = async (key: string, value: string) => {
    await supabase.from("settings" as any).update({ value }).eq("key", key);
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({ title: "✓ Setting saved" });
  };

  const exportCSV = () => {
    const csv = "Email,Date\n" + newsletter.map(n => `${n.email},${n.created_at}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "newsletter_subscribers.csv";
    a.click();
  };

  if (authLoading || loadingData) {
    return <div className="min-h-screen bg-nero flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-gold border-t-transparent rounded-full" /></div>;
  }

  const todayOrders = orders.filter(o => new Date(o.created_at).toDateString() === new Date().toDateString());
  const weekOrders = orders.filter(o => { const d = new Date(o.created_at); const now = new Date(); return d >= new Date(now.setDate(now.getDate() - 7)); });
  const totalRevenue = orders.reduce((s, o) => s + Number(o.total), 0);
  const pendingOrders = orders.filter(o => o.status === "in_attesa");
  const pendingReviews = reviews.filter(r => r.status === "pending");
  const filteredOrders = orderFilter === "all" ? orders : orders.filter(o => o.status === orderFilter);
  const filteredReviews = reviewFilter === "all" ? reviews : reviews.filter(r => r.status === reviewFilter);

  const tabs = [
    { key: "overview" as const, label: "Overview", icon: BarChart3 },
    { key: "orders" as const, label: "Orders", icon: ShoppingCart, badge: pendingOrders.length },
    { key: "reviews" as const, label: "Reviews", icon: Star, badge: pendingReviews.length },
    { key: "users" as const, label: "Users", icon: Users },
    { key: "products" as const, label: "Media", icon: Package },
    { key: "description" as const, label: "Description", icon: FileText },
    { key: "variants" as const, label: "Variants", icon: Palette },
    { key: "newsletter" as const, label: "Newsletter", icon: Mail },
    { key: "settings" as const, label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-nero flex">
      <Helmet>
        <title>Admin Panel | Fresa Unghie Pro</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {/* Sidebar */}
      <aside className="w-64 bg-nero-light border-r border-gold/10 p-6 flex flex-col">
        <div className="mb-8">
          <span className="font-serif text-xl font-bold text-cream">Fresa <span className="italic text-gold">Unghie</span> Pro</span>
          <p className="text-xs text-gold/60 font-sans mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 space-y-1">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-sans transition-colors ${tab === t.key ? "bg-gold/20 text-gold font-semibold" : "text-cream/60 hover:text-cream hover:bg-gold/5"}`}>
              <t.icon size={18} />
              {t.label}
              {t.badge ? <span className="ml-auto bg-gold text-nero text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{t.badge}</span> : null}
            </button>
          ))}
        </nav>
        <button onClick={async () => { await signOut(); navigate("/"); }}
          className="flex items-center gap-2 text-cream/40 hover:text-cream text-sm font-sans mt-4">
          <LogOut size={16} /> Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-auto">
        {tab === "overview" && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-cream mb-6">Dashboard</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Orders Today", value: todayOrders.length },
                { label: "Orders This Week", value: weekOrders.length },
                { label: "Total Revenue", value: `€${totalRevenue.toFixed(2).replace(".", ",")}` },
                { label: "Pending", value: pendingOrders.length },
              ].map(c => (
                <div key={c.label} className="bg-nero-card border border-gold/10 rounded-xl p-6">
                  <p className="text-cream/60 text-sm font-sans">{c.label}</p>
                  <p className="text-2xl font-bold text-gold font-sans mt-1">{c.value}</p>
                </div>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-nero-card border border-gold/10 rounded-xl p-6">
                <p className="text-cream/60 text-sm font-sans">Registered Users</p>
                <p className="text-2xl font-bold text-cream font-sans mt-1">{users.length}</p>
              </div>
              <div className="bg-nero-card border border-gold/10 rounded-xl p-6">
                <p className="text-cream/60 text-sm font-sans">Pending Reviews</p>
                <p className="text-2xl font-bold text-cream font-sans mt-1">{pendingReviews.length}</p>
              </div>
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-cream mb-6">Order Management</h2>
            <div className="flex gap-2 mb-4 flex-wrap">
              {["all", ...statusOptions].map(s => (
                <button key={s} onClick={() => setOrderFilter(s)}
                  className={`px-3 py-1.5 rounded-md text-sm font-sans ${orderFilter === s ? "bg-gold text-nero font-semibold" : "bg-nero-card text-cream/60 border border-gold/10"}`}>
                  {s === "all" ? "All" : statusLabels[s]}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              {filteredOrders.map(order => (
                <div key={order.id} className="bg-nero-card border border-gold/10 rounded-xl p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-cream font-sans font-bold">#{order.order_number} — {order.customer_name}</p>
                      <p className="text-cream/40 text-xs font-sans">{order.customer_email} · {order.customer_phone} · {new Date(order.created_at).toLocaleDateString("en-US")}</p>
                      <p className="text-cream/40 text-xs font-sans">{order.shipping_address}, {order.shipping_cap} {order.shipping_city} ({order.shipping_province})</p>
                      {order.notes && <p className="text-cream/50 text-xs font-sans mt-1 italic">Notes: {order.notes}</p>}
                    </div>
                    <p className="text-gold font-sans font-bold text-lg">€{Number(order.total).toFixed(2).replace(".", ",")}</p>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {(order.items as any[]).map((item: any, i: number) => (
                      <div key={i} className="flex items-center gap-2 bg-nero/50 rounded-lg p-2">
                        <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
                        <div>
                          <p className="text-cream text-xs font-sans font-semibold">{item.name}</p>
                          <p className="text-cream/40 text-xs font-sans">Qty: {item.quantity} · €{Number(item.price).toFixed(2).replace(".", ",")}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 items-center">
                    <select value={order.status} onChange={e => updateOrderStatus(order.id, e.target.value)}
                      className="bg-nero border border-gold/20 text-cream rounded-md px-3 py-1.5 text-sm font-sans">
                      {statusOptions.map(s => <option key={s} value={s}>{statusLabels[s]}</option>)}
                    </select>
                    <div className="flex gap-2 flex-1 min-w-[250px]">
                      <input
                        placeholder="Tracking ID / URL"
                        value={trackingInputs[order.id] || ""}
                        onChange={e => setTrackingInputs(prev => ({ ...prev, [order.id]: e.target.value }))}
                        className="bg-nero border border-gold/20 text-cream rounded-md px-3 py-1.5 text-sm font-sans flex-1"
                      />
                      <button
                        onClick={() => saveTrackingUrl(order.id)}
                        className="bg-gold text-nero px-3 py-1.5 rounded-md text-sm font-sans font-semibold hover:bg-gold-light transition-colors flex items-center gap-1"
                      >
                        <Save size={14} /> Save
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "reviews" && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-cream mb-6">Review Management</h2>

            {/* Add Review Form */}
            <AddReviewForm onAdded={loadAllData} />

            <div className="flex gap-2 mb-4">
              {["all", "pending", "approved", "rejected"].map(s => (
                <button key={s} onClick={() => setReviewFilter(s)}
                  className={`px-3 py-1.5 rounded-md text-sm font-sans ${reviewFilter === s ? "bg-gold text-nero font-semibold" : "bg-nero-card text-cream/60 border border-gold/10"}`}>
                  {s === "all" ? "All" : reviewStatusLabels[s]}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              {filteredReviews.map(review => (
                <div key={review.id} className="bg-nero-card border border-gold/10 rounded-xl p-6">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <p className="text-cream font-sans font-bold">{review.user_name}</p>
                      <p className="text-cream/40 text-xs font-sans">{review.user_email} · {review.product_id} · {new Date(review.created_at).toLocaleDateString("en-US")}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? "text-gold" : "text-cream/20"}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-cream/80 text-sm font-sans mb-2">{review.text}</p>
                  {review.photo_url && <img src={review.photo_url} alt="Review" className="w-20 h-20 rounded-lg object-cover mb-3" />}
                  <div className="flex gap-2">
                    <button onClick={() => updateReviewStatus(review.id, "approved")} className="bg-green-900/30 text-green-400 border border-green-800 px-3 py-1 rounded-md text-sm font-sans hover:bg-green-900/50">Approve</button>
                    <button onClick={() => updateReviewStatus(review.id, "rejected")} className="bg-red-900/30 text-red-400 border border-red-800 px-3 py-1 rounded-md text-sm font-sans hover:bg-red-900/50">Reject</button>
                    <button onClick={() => deleteReview(review.id)} className="bg-red-900/30 text-red-400 border border-red-800 px-3 py-1 rounded-md text-sm font-sans hover:bg-red-900/50">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "users" && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-cream mb-6">User Management</h2>
            <div className="space-y-4">
              {users.map(u => {
                const userOrders = orders.filter(o => o.user_id === u.user_id);
                const totalSpent = userOrders.reduce((s, o) => s + Number(o.total), 0);
                return (
                  <div key={u.id} className="bg-nero-card border border-gold/10 rounded-xl p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-cream font-sans font-bold">{u.nome || ""} {u.cognome || ""}</p>
                        <p className="text-cream/40 text-xs font-sans">{u.email} · {u.telefono || "N/A"} · Registered: {new Date(u.created_at).toLocaleDateString("en-US")}</p>
                        {u.indirizzo && <p className="text-cream/30 text-xs font-sans">{u.indirizzo}, {u.cap} {u.citta} ({u.provincia})</p>}
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-cream/40 text-xs font-sans">Orders</p>
                          <p className="text-cream font-sans font-bold">{userOrders.length}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-cream/40 text-xs font-sans">Total Spent</p>
                          <p className="text-gold font-sans font-bold">€{totalSpent.toFixed(2).replace(".", ",")}</p>
                        </div>
                      </div>
                    </div>
                    {userOrders.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gold/10 space-y-2">
                        {userOrders.map(o => (
                          <div key={o.id} className="flex items-center justify-between text-xs font-sans">
                            <span className="text-cream/60">#{o.order_number} · {new Date(o.created_at).toLocaleDateString("en-US")}</span>
                            <span className="text-cream/40">{statusLabels[o.status]}</span>
                            <span className="text-gold">€{Number(o.total).toFixed(2).replace(".", ",")}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {tab === "products" && <ProductMediaManager />}
        {tab === "description" && <ProductDescriptionBuilder />}
        {tab === "variants" && <ProductVariantManager />}

        {tab === "newsletter" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-cream">Newsletter ({newsletter.length})</h2>
              <button onClick={exportCSV} className="bg-gold text-nero px-4 py-2 rounded-md font-sans text-sm font-semibold hover:bg-gold-light transition-colors">
                Export CSV
              </button>
            </div>
            <div className="bg-nero-card border border-gold/10 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead><tr className="border-b border-gold/10"><th className="text-left px-6 py-3 text-cream/60 text-sm font-sans">Email</th><th className="text-left px-6 py-3 text-cream/60 text-sm font-sans">Date</th></tr></thead>
                <tbody>
                  {newsletter.map(n => (
                    <tr key={n.id} className="border-b border-gold/5">
                      <td className="px-6 py-3 text-cream text-sm font-sans">{n.email}</td>
                      <td className="px-6 py-3 text-cream/40 text-sm font-sans">{new Date(n.created_at).toLocaleDateString("en-US")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "settings" && (
          <div>
            <h2 className="font-serif text-2xl font-bold text-cream mb-6">Settings</h2>
            <div className="space-y-6 max-w-lg">
              {[
                { key: "announcement_text", label: "Announcement Bar Text" },
                { key: "free_shipping_threshold", label: "Free Shipping Threshold (€)" },
                { key: "delivery_time", label: "Delivery Time" },
              ].map(s => (
                <div key={s.key} className="bg-nero-card border border-gold/10 rounded-xl p-6">
                  <label className="text-cream/60 text-sm font-sans block mb-2">{s.label}</label>
                  <input value={settings[s.key] || ""} onChange={e => setSettings(prev => ({ ...prev, [s.key]: e.target.value }))}
                    className="w-full bg-nero border border-gold/20 text-cream rounded-md px-4 py-2.5 text-sm font-sans mb-3" />
                  <button onClick={() => saveSetting(s.key, settings[s.key] || "")}
                    className="bg-gold text-nero px-4 py-1.5 rounded-md font-sans text-sm font-semibold hover:bg-gold-light transition-colors">
                    Save
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
