import { useState, useEffect } from "react";
import { Reorder } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { products } from "@/data/products";
import { Plus, Trash2, Image, Video, Pencil, Check, X, Star, GripVertical } from "lucide-react";

const ProductMediaManager = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0].id);
  const [media, setMedia] = useState<any[]>([]);
  const [newUrl, setNewUrl] = useState("");
  const [newThumbnail, setNewThumbnail] = useState("");
  const [newType, setNewType] = useState<"image" | "video">("image");
  const [newPlacement, setNewPlacement] = useState<"gallery" | "tab">("gallery");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState("");
  const [editThumbnail, setEditThumbnail] = useState("");
  const [editType, setEditType] = useState<"image" | "video">("image");
  const [editPlacement, setEditPlacement] = useState<"gallery" | "tab">("gallery");

  const loadMedia = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("product_media")
      .select("*")
      .eq("product_id", selectedProduct)
      .order("sort_order", { ascending: true });
    setMedia((data as any[]) || []);
    setLoading(false);
  };

  useEffect(() => { loadMedia(); }, [selectedProduct]);

  const addMedia = async () => {
    if (!newUrl.trim()) return;
    const maxOrder = media.length > 0 ? Math.max(...media.map(m => m.sort_order)) + 1 : 0;
    const { error } = await supabase.from("product_media" as any).insert({
      product_id: selectedProduct,
      media_type: newType,
      url: newUrl.trim(),
      thumbnail_url: newType === "video" && newThumbnail.trim() ? newThumbnail.trim() : null,
      sort_order: maxOrder,
      placement: newPlacement,
    });
    if (error) {
      toast({ title: "Error adding media", variant: "destructive" });
      return;
    }
    toast({ title: `✓ Added to ${newPlacement === "gallery" ? "Gallery" : "Video Tab"}` });
    setNewUrl("");
    setNewThumbnail("");
    loadMedia();
  };

  const removeMedia = async (id: string) => {
    await supabase.from("product_media" as any).delete().eq("id", id);
    setMedia(prev => prev.filter(m => m.id !== id));
    toast({ title: "✓ Media removed" });
  };

  const startEdit = (m: any) => {
    setEditingId(m.id);
    setEditUrl(m.url);
    setEditThumbnail(m.thumbnail_url || "");
    setEditType(m.media_type);
    setEditPlacement(m.placement || "gallery");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditUrl("");
    setEditThumbnail("");
  };

  const saveEdit = async (id: string) => {
    if (!editUrl.trim()) {
      toast({ title: "URL cannot be empty", variant: "destructive" });
      return;
    }
    const updateData: any = {
      url: editUrl.trim(),
      media_type: editType,
      placement: editPlacement,
      thumbnail_url: editType === "video" && editThumbnail.trim() ? editThumbnail.trim() : null,
    };
    const { error } = await supabase
      .from("product_media" as any)
      .update(updateData)
      .eq("id", id);
    if (error) {
      toast({ title: "Error updating media", variant: "destructive" });
      return;
    }
    toast({ title: "✓ Media updated" });
    setEditingId(null);
    loadMedia();
  };

  const setAsMain = async (id: string) => {
    const targetIdx = media.findIndex(m => m.id === id);
    if (targetIdx === 0) return; // Already first

    const otherMedia = media.filter(m => m.id !== id);
    const updates = [
      { id, sort_order: 0 },
      ...otherMedia.map((m, i) => ({ id: m.id, sort_order: i + 1 }))
    ];

    setLoading(true);
    for (const u of updates) {
      await supabase.from("product_media" as any).update({ sort_order: u.sort_order }).eq("id", u.id);
    }
    toast({ title: "✓ Set as main image" });
    loadMedia();
  };

  const handleReorder = async (newOrder: any[]) => {
    setMedia(newOrder); // Optimistic UI update
    
    // Batch update to Supabase
    for (let i = 0; i < newOrder.length; i++) {
        const item = newOrder[i];
        if (item.sort_order !== i) {
            await supabase.from("product_media" as any).update({ sort_order: i }).eq("id", item.id);
        }
    }
    // No need to reload as we updated state optimistically, but we can to be safe
    // loadMedia();
  };

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-cream mb-6">Product Media</h2>

      <div className="flex gap-3 mb-6 flex-wrap">
        {products.map(p => (
          <button key={p.id} onClick={() => setSelectedProduct(p.id)}
            className={`px-4 py-2 rounded-md text-sm font-sans transition-colors ${selectedProduct === p.id ? "bg-gold text-nero font-semibold" : "bg-nero-card text-cream/60 border border-gold/10"}`}>
            {p.name}
          </button>
        ))}
      </div>

      <div className="bg-nero-card border border-gold/10 rounded-xl p-6 mb-6">
        <p className="text-cream font-sans font-semibold mb-3">Add New Media</p>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="space-y-1.5">
              <label className="text-cream/40 text-[10px] uppercase font-sans font-bold">Type</label>
              <div className="flex gap-2">
                <button onClick={() => setNewType("image")}
                  className={`px-3 py-1.5 rounded-md text-sm font-sans flex items-center gap-1 ${newType === "image" ? "bg-gold text-nero font-semibold" : "bg-nero text-cream/60 border border-gold/20"}`}>
                  <Image size={14} /> Image
                </button>
                <button onClick={() => setNewType("video")}
                  className={`px-3 py-1.5 rounded-md text-sm font-sans flex items-center gap-1 ${newType === "video" ? "bg-gold text-nero font-semibold" : "bg-nero text-cream/60 border border-gold/20"}`}>
                  <Video size={14} /> Video
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-cream/40 text-[10px] uppercase font-sans font-bold">Display Placement</label>
              <div className="flex gap-2">
                <button onClick={() => setNewPlacement("gallery")}
                  className={`px-3 py-1.5 rounded-md text-sm font-sans flex items-center gap-1 ${newPlacement === "gallery" ? "bg-gold text-nero font-semibold" : "bg-nero text-cream/60 border border-gold/20"}`}>
                  Main Gallery
                </button>
                <button onClick={() => setNewPlacement("tab")}
                  className={`px-3 py-1.5 rounded-md text-sm font-sans flex items-center gap-1 ${newPlacement === "tab" ? "bg-gold text-nero font-semibold" : "bg-nero text-cream/60 border border-gold/20"}`}>
                  Video Tab Only
                </button>
              </div>
            </div>
            {newType === "video" && <span className="text-cream/30 text-[10px] font-sans self-end uppercase tracking-wider italic mb-1">Suporta MP4 & YouTube</span>}
          </div>

          <div className="space-y-3">
            <input value={newUrl} onChange={e => setNewUrl(e.target.value)}
              placeholder={newType === "image" ? "Paste image URL..." : "Paste video URL (MP4, YouTube)..."}
              className="w-full bg-nero border border-gold/20 text-cream rounded-md px-4 py-2 text-sm font-sans" />
            {newType === "video" && (
              <input value={newThumbnail} onChange={e => setNewThumbnail(e.target.value)}
                placeholder="Thumbnail image URL (optional, auto-generated for YouTube)"
                className="w-full bg-nero border border-gold/20 text-cream rounded-md px-4 py-2 text-sm font-sans" />
            )}
            <button onClick={addMedia}
              className="bg-gold text-nero px-4 py-2 rounded-md text-sm font-sans font-semibold hover:bg-gold-light transition-colors flex items-center gap-1">
              <Plus size={14} /> Add Media
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-cream/40 font-sans text-sm">Loading...</div>
      ) : media.length === 0 ? (
        <div className="bg-nero-card border border-gold/10 rounded-xl p-8 text-center">
          <p className="text-cream/40 font-sans text-sm">No custom media added yet.</p>
        </div>
      ) : (
        <Reorder.Group axis="y" values={media} onReorder={handleReorder} className="space-y-3">
          {media.map((m: any, i) => (
            <Reorder.Item 
              key={m.id} 
              value={m} 
              className="bg-nero-card border border-gold/10 rounded-xl p-4 cursor-grab active:cursor-grabbing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileDrag={{ scale: 1.02, boxShadow: "0px 5px 15px rgba(0,0,0,0.25)" }}
            >
              {editingId === m.id ? (
                /* ─── EDIT MODE ─── */
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-gold font-sans font-semibold text-sm flex items-center gap-2">
                      <Pencil size={14} /> Editing Media
                    </p>
                    <div className="flex gap-2">
                      <button onClick={() => saveEdit(m.id)}
                        className="bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-md text-xs font-sans font-semibold transition-colors flex items-center gap-1">
                        <Check size={12} /> Save
                      </button>
                      <button onClick={cancelEdit}
                        className="bg-nero hover:bg-nero-light text-cream/60 px-3 py-1.5 rounded-md text-xs font-sans font-semibold transition-colors border border-gold/10 flex items-center gap-1">
                        <X size={12} /> Cancel
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <div className="space-y-1.5">
                      <label className="text-cream/40 text-[10px] uppercase font-sans font-bold">Type</label>
                      <div className="flex gap-2">
                        <button onClick={() => setEditType("image")}
                          className={`px-3 py-1.5 rounded-md text-sm font-sans flex items-center gap-1 ${editType === "image" ? "bg-gold text-nero font-semibold" : "bg-nero text-cream/60 border border-gold/20"}`}>
                          <Image size={14} /> Image
                        </button>
                        <button onClick={() => setEditType("video")}
                          className={`px-3 py-1.5 rounded-md text-sm font-sans flex items-center gap-1 ${editType === "video" ? "bg-gold text-nero font-semibold" : "bg-nero text-cream/60 border border-gold/20"}`}>
                          <Video size={14} /> Video
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-cream/40 text-[10px] uppercase font-sans font-bold">Placement</label>
                      <div className="flex gap-2">
                        <button onClick={() => setEditPlacement("gallery")}
                          className={`px-3 py-1.5 rounded-md text-sm font-sans flex items-center gap-1 ${editPlacement === "gallery" ? "bg-gold text-nero font-semibold" : "bg-nero text-cream/60 border border-gold/20"}`}>
                          Main Gallery
                        </button>
                        <button onClick={() => setEditPlacement("tab")}
                          className={`px-3 py-1.5 rounded-md text-sm font-sans flex items-center gap-1 ${editPlacement === "tab" ? "bg-gold text-nero font-semibold" : "bg-nero text-cream/60 border border-gold/20"}`}>
                          Video Tab Only
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-cream/40 text-[10px] uppercase font-sans font-bold">URL</label>
                      <input value={editUrl} onChange={e => setEditUrl(e.target.value)}
                        placeholder="Media URL..."
                        className="w-full bg-nero border border-gold/20 text-cream rounded-md px-4 py-2 text-sm font-sans focus:border-gold/50 focus:outline-none transition-colors" />
                    </div>
                    {editType === "video" && (
                      <div className="space-y-1.5">
                        <label className="text-cream/40 text-[10px] uppercase font-sans font-bold">Thumbnail URL</label>
                        <input value={editThumbnail} onChange={e => setEditThumbnail(e.target.value)}
                          placeholder="Thumbnail image URL (optional)"
                          className="w-full bg-nero border border-gold/20 text-cream rounded-md px-4 py-2 text-sm font-sans focus:border-gold/50 focus:outline-none transition-colors" />
                      </div>
                    )}
                  </div>

                  {/* Preview */}
                  {editUrl.trim() && editType === "image" && (
                    <div className="flex items-center gap-3">
                      <span className="text-cream/40 text-[10px] uppercase font-sans font-bold">Preview</span>
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-nero border border-gold/10">
                        <img src={editUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* ─── VIEW MODE ─── */
                <div className="flex items-center gap-4">
                  <div className="text-gold/20 flex-shrink-0 cursor-grab">
                    <GripVertical size={20} />
                  </div>
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-nero flex-shrink-0 relative group">
                    {m.media_type === "image" ? (
                      <img src={m.url} alt="" className={`w-full h-full object-cover ${i === 0 ? 'border-2 border-gold' : ''}`} />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center text-gold bg-nero-light ${i === 0 ? 'border-2 border-gold' : ''}`}><Video size={24} /></div>
                    )}
                    {i === 0 && (
                      <div className="absolute top-0 left-0 bg-gold text-nero text-[8px] font-bold px-1 rounded-br">MAIN</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-cream/60 text-[10px] font-sans uppercase font-bold tracking-wider">{m.media_type}</p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-sans font-bold uppercase ${m.placement === 'tab' ? 'bg-blue-500/20 text-blue-400' : 'bg-gold/20 text-gold'}`}>
                        {m.placement === 'tab' ? 'Video Tab Only' : 'Main Gallery'}
                      </span>
                    </div>
                    <p className="text-cream text-sm font-sans truncate">{m.url}</p>
                  </div>
                  <button 
                    onClick={() => setAsMain(m.id)} 
                    className={`p-2 transition-colors ${i === 0 ? 'text-gold' : 'text-gold/20 hover:text-gold'}`}
                    title={i === 0 ? "Main image" : "Set as main image"}
                    disabled={i === 0}
                  >
                    <Star size={16} fill={i === 0 ? "currentColor" : "none"} />
                  </button>
                  <button onClick={() => startEdit(m)} className="text-gold/60 hover:text-gold p-2 transition-colors" title="Edit media">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => removeMedia(m.id)} className="text-red-400 hover:text-red-300 p-2 transition-colors" title="Delete media">
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
    </div>
  );
};

export default ProductMediaManager;
