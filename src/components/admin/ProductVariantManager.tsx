import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { products } from "@/data/products";
import { Plus, Trash2, Palette, Euro, Image as ImageIcon } from "lucide-react";

interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  color_code: string | null;
  image_url: string | null;
  price: number | null;
}

const ProductVariantManager = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0].id);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [newName, setNewName] = useState("");
  const [newColorCode, setNewColorCode] = useState("#FFFFFF");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const loadVariants = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("product_variants" as any)
      .select("*")
      .eq("product_id", selectedProduct)
      .order("created_at", { ascending: true });
    
    if (error) {
      console.error("Error loading variants:", error);
    } else {
      setVariants((data as unknown as ProductVariant[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadVariants();
  }, [selectedProduct]);

  const addVariant = async () => {
    if (!newName.trim()) {
      toast({ title: "Name is required", variant: "destructive" });
      return;
    }

    const { error } = await supabase.from("product_variants" as any).insert({
      product_id: selectedProduct,
      name: newName.trim(),
      color_code: newColorCode,
      image_url: newImageUrl.trim() || null,
      price: newPrice ? parseFloat(newPrice) : null,
    });

    if (error) {
      toast({ title: "Error adding variant", variant: "destructive" });
      return;
    }

    toast({ title: "✓ Variant added successfully" });
    setNewName("");
    setNewColorCode("#FFFFFF");
    setNewImageUrl("");
    setNewPrice("");
    loadVariants();
  };

  const removeVariant = async (id: string) => {
    const { error } = await supabase.from("product_variants" as any).delete().eq("id", id);
    
    if (error) {
      toast({ title: "Error removing variant", variant: "destructive" });
      return;
    }

    setVariants(prev => prev.filter(v => v.id !== id));
    toast({ title: "✓ Variant removed" });
  };

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-bold text-cream mb-6">Product Color Variants</h2>

      <div className="flex gap-3 mb-6 flex-wrap">
        {products.map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedProduct(p.id)}
            className={`px-4 py-2 rounded-md text-sm font-sans transition-colors ${
              selectedProduct === p.id 
                ? "bg-gold text-nero font-semibold" 
                : "bg-nero-card text-cream/60 border border-gold/10"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Add New Variant Form */}
      <div className="bg-nero-card border border-gold/10 rounded-xl p-6">
        <p className="text-cream font-sans font-semibold mb-4">Add New Color Variant</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-cream/60 text-xs font-sans block mb-1">Color Name *</label>
            <input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="e.g. Bianco Perla"
              className="w-full bg-nero border border-gold/20 text-cream rounded-md px-3 py-2 text-sm font-sans"
            />
          </div>
          <div>
            <label className="text-cream/60 text-xs font-sans block mb-1">Color Hex Code</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={newColorCode}
                onChange={e => setNewColorCode(e.target.value)}
                className="w-10 h-10 p-1 bg-nero border border-gold/20 rounded-md cursor-pointer"
              />
              <input
                value={newColorCode}
                onChange={e => setNewColorCode(e.target.value)}
                placeholder="#FFFFFF"
                className="flex-1 bg-nero border border-gold/20 text-cream rounded-md px-3 py-2 text-sm font-sans uppercase"
              />
            </div>
          </div>
          <div>
            <label className="text-cream/60 text-xs font-sans block mb-1">Variant Price (Optional)</label>
            <div className="relative">
              <Euro className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/30" size={14} />
              <input
                type="number"
                step="0.01"
                value={newPrice}
                onChange={e => setNewPrice(e.target.value)}
                placeholder={products.find(p => p.id === selectedProduct)?.price.toString()}
                className="w-full bg-nero border border-gold/20 text-cream rounded-md pl-8 pr-3 py-2 text-sm font-sans"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={addVariant}
              className="w-full bg-gold text-nero py-2 rounded-md text-sm font-sans font-semibold hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add Variant
            </button>
          </div>
        </div>
        <div className="mt-4">
          <label className="text-cream/60 text-xs font-sans block mb-1">Variant Image URL (Optional)</label>
          <div className="relative">
            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/30" size={14} />
            <input
              value={newImageUrl}
              onChange={e => setNewImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-nero border border-gold/20 text-cream rounded-md pl-8 pr-3 py-2 text-sm font-sans"
            />
          </div>
        </div>
      </div>

      {/* Variants List */}
      <div className="space-y-4">
        <h3 className="text-cream font-sans font-semibold">Active Variants</h3>
        {loading ? (
          <div className="text-cream/40 text-sm font-sans">Loading variants...</div>
        ) : variants.length === 0 ? (
          <div className="bg-nero-card border border-gold/10 rounded-xl p-8 text-center text-cream/40 text-sm font-sans">
            No variants defined for this product yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {variants.map(v => (
              <div key={v.id} className="bg-nero-card border border-gold/10 rounded-xl p-4 flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full border border-gold/20 flex-shrink-0 shadow-inner"
                  style={{ backgroundColor: v.color_code || "transparent" }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-cream font-sans font-bold truncate">{v.name}</p>
                  <div className="flex gap-3 mt-1">
                    <p className="text-cream/40 text-xs font-sans uppercase flex items-center gap-1">
                      <Palette size={10} /> {v.color_code}
                    </p>
                    {v.price && (
                      <p className="text-gold text-xs font-sans font-semibold flex items-center gap-1">
                        <Euro size={10} /> {v.price}
                      </p>
                    )}
                  </div>
                  {v.image_url && (
                    <p className="text-cream/30 text-[10px] font-sans truncate mt-1">
                      Image: {v.image_url}
                    </p>
                  )}
                </div>
                {v.image_url && (
                  <div className="w-12 h-12 rounded bg-nero overflow-hidden border border-gold/10">
                    <img src={v.image_url} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <button
                  onClick={() => removeVariant(v.id)}
                  className="text-red-400 hover:text-red-300 p-2 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductVariantManager;
