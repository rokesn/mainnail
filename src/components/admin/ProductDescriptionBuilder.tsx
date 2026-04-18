import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { products } from "@/data/products";
import { Plus, Trash2, ArrowUp, ArrowDown, Layout, Type, Image as ImageIcon, Save } from "lucide-react";

interface DescriptionBlock {
  id: string;
  product_id: string;
  title: string | null;
  content: string | null;
  image_url: string | null;
  sort_order: number;
}

const ProductDescriptionBuilder = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0].id);
  const [blocks, setBlocks] = useState<DescriptionBlock[]>([]);
  const [loading, setLoading] = useState(false);

  // Form State
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [saving, setSaving] = useState(false);

  const loadBlocks = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("product_description_blocks" as any)
      .select("*")
      .eq("product_id", selectedProduct)
      .order("sort_order", { ascending: true });
    setBlocks((data as any[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    loadBlocks();
  }, [selectedProduct]);

  const addBlock = async () => {
    if (!newContent.trim() && !newImageUrl.trim()) {
      toast({ title: "Please provide text or an image URL", variant: "destructive" });
      return;
    }

    setSaving(true);
    const maxOrder = blocks.length > 0 ? Math.max(...blocks.map(b => b.sort_order)) + 1 : 0;
    
    const { error } = await supabase.from("product_description_blocks" as any).insert({
      product_id: selectedProduct,
      title: newTitle.trim() || null,
      content: newContent.trim() || null,
      image_url: newImageUrl.trim() || null,
      sort_order: maxOrder,
    });

    setSaving(false);
    if (error) {
      toast({ title: "Error adding block", variant: "destructive" });
      return;
    }

    toast({ title: "✓ Block added to description" });
    setNewTitle("");
    setNewContent("");
    setNewImageUrl("");
    loadBlocks();
  };

  const deleteBlock = async (id: string) => {
    const { error } = await supabase.from("product_description_blocks" as any).delete().eq("id", id);
    if (error) {
      toast({ title: "Error deleting block", variant: "destructive" });
      return;
    }
    setBlocks(prev => prev.filter(b => b.id !== id));
    toast({ title: "✓ Block removed" });
  };

  const moveBlock = async (id: string, direction: "up" | "down") => {
    const idx = blocks.findIndex(b => b.id === id);
    if ((direction === "up" && idx === 0) || (direction === "down" && idx === blocks.length - 1)) return;

    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    const updates = [
      { id: blocks[idx].id, sort_order: blocks[swapIdx].sort_order },
      { id: blocks[swapIdx].id, sort_order: blocks[idx].sort_order },
    ];

    for (const u of updates) {
      await supabase.from("product_description_blocks" as any).update({ sort_order: u.sort_order }).eq("id", u.id);
    }
    loadBlocks();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-cream">Product Description Builder</h2>
        <div className="flex gap-2">
          {products.map(p => (
            <button key={p.id} onClick={() => setSelectedProduct(p.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-sans transition-colors ${selectedProduct === p.id ? "bg-gold text-nero font-semibold" : "bg-nero-card text-cream/60 border border-gold/10"}`}>
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Add New Block Form */}
      <div className="bg-nero-card border border-gold/10 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4 text-gold">
          <Plus size={18} />
          <span className="font-sans font-semibold">Add Content Block</span>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-cream/40 text-[10px] uppercase font-sans font-bold block mb-1">Block Title (Optional)</label>
            <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Design Ergonomico"
              className="w-full bg-nero border border-gold/20 text-cream rounded-md px-4 py-2 text-sm font-sans" />
          </div>
          
          <div>
            <label className="text-cream/40 text-[10px] uppercase font-sans font-bold block mb-1">Description Text</label>
            <textarea value={newContent} onChange={e => setNewContent(e.target.value)} placeholder="Descrivi il prodotto in dettaglio..." rows={4}
              className="w-full bg-nero border border-gold/20 text-cream rounded-md px-4 py-2 text-sm font-sans" />
          </div>

          <div>
            <label className="text-cream/40 text-[10px] uppercase font-sans font-bold block mb-1">Big Image URL (Optional)</label>
            <input value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)} placeholder="https://..."
              className="w-full bg-nero border border-gold/20 text-cream rounded-md px-4 py-2 text-sm font-sans" />
          </div>

          <button onClick={addBlock} disabled={saving}
            className="w-full bg-gold text-nero py-2.5 rounded-md font-sans font-semibold hover:bg-gold-light transition-colors flex items-center justify-center gap-2">
            <Save size={16} /> {saving ? "Saving..." : "Add Block"}
          </button>
        </div>
      </div>

      {/* Blocks List */}
      <div className="space-y-4">
        <h3 className="text-cream/60 text-sm font-sans font-bold uppercase tracking-wider">Current Description Flow</h3>
        {loading ? (
          <div className="text-cream/40 font-sans text-sm italic">Loading blocks...</div>
        ) : blocks.length === 0 ? (
          <div className="bg-nero-card/50 border border-gold/5 rounded-xl p-8 text-center">
            <p className="text-cream/30 font-sans text-sm italic">No dynamic blocks added yet. Using default catalog description.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {blocks.map((block, i) => (
              <div key={block.id} className="bg-nero-card border border-gold/10 rounded-xl p-4 flex gap-4">
                <div className="flex flex-col gap-2">
                  <button onClick={() => moveBlock(block.id, "up")} disabled={i === 0} className="p-1 text-cream/30 hover:text-gold disabled:opacity-10 transition-colors"><ArrowUp size={16} /></button>
                  <button onClick={() => moveBlock(block.id, "down")} disabled={i === blocks.length - 1} className="p-1 text-cream/30 hover:text-gold disabled:opacity-10 transition-colors"><ArrowDown size={16} /></button>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gold"><Layout size={14} /></span>
                    <p className="text-cream font-sans font-bold">{block.title || `Block #${i + 1}`}</p>
                  </div>
                  
                  {block.content && (
                    <div className="flex items-start gap-2 mb-3">
                      <Type size={12} className="text-cream/30 mt-1 flex-shrink-0" />
                      <p className="text-cream/60 text-sm font-sans line-clamp-3">{block.content}</p>
                    </div>
                  )}

                  {block.image_url && (
                    <div className="flex items-start gap-2">
                      <ImageIcon size={12} className="text-cream/30 mt-1 flex-shrink-0" />
                      <div className="relative group">
                        <img src={block.image_url} alt="Block" className="h-20 w-40 object-cover rounded-md border border-gold/10" />
                        <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                          <span className="text-nero text-[10px] font-bold uppercase">Big Image</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <button onClick={() => deleteBlock(block.id)} className="self-start text-red-400/50 hover:text-red-400 p-2 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescriptionBuilder;
