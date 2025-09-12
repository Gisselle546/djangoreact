// src/utils/size.ts
export type NormalizedSize = {
  id: number | string;
  label: string; // "Small" | "XL" | "7" | "9.5"
  value?: number; // numeric value if it's a shoe size ("9.5" → 9.5)
  inStock: boolean;
  variant?: any; // the matching variant (images/sku/inventory)
  type: "shoe" | "apparel";
};

type RawProduct = any;

const toNum = (v: unknown) => {
  const n = Number(String(v).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : undefined;
};

/**
 * Build a single, canonical size list from your product.
 * Handles:
 *  - Jerseys: no `sizes[]` in option, sizes live only on variants.
 *  - Shoes: `sizes[]` is present in option; variants reference those size IDs.
 */
export function buildSizeModel(product: RawProduct): NormalizedSize[] {
  const opt = product?.product_options?.[0] ?? {};
  const variants: any[] = Array.isArray(opt?.product_variants)
    ? opt.product_variants
    : [];
  const sizesList: any[] = Array.isArray(opt?.sizes) ? opt.sizes : [];

  // If sizes[] exists → treat as SHOES; map size.id → variant
  if (sizesList.length) {
    const vBySizeId = new Map(
      variants.map((v) => [v?.size?.id ?? v?.size_id, v])
    );
    const out: NormalizedSize[] = sizesList.map((s) => {
      const v = vBySizeId.get(s.id);
      const label = s.size ?? s.label ?? s.slug ?? String(s.id);
      const value = toNum(label);
      return {
        id: s.id,
        label,
        value,
        inStock: (v?.inventory ?? 0) > 0,
        variant: v,
        type: "shoe",
      };
    });
    out.sort((a, b) => (a.value ?? 0) - (b.value ?? 0)); // numeric order: 7, 7.5, 8...
    return out;
  }

  // Otherwise → APPAREL; derive from variants
  return variants.map((v) => {
    const sz = v?.size ?? {};
    const id =
      sz.id ?? v.size_id ?? sz.slug ?? sz.label ?? sz.size ?? String(v?.id);
    const label = sz.label ?? sz.size ?? sz.slug ?? String(id);
    const value = toNum(label);
    const isShoe = typeof value === "number";
    return {
      id,
      label,
      value,
      inStock: (v?.inventory ?? 0) > 0,
      variant: v,
      type: isShoe ? "shoe" : "apparel",
    };
  });
}

/**
 * Keep your legacy “newArray” for SizeBox compatibility.
 * Shape: [{ inventory, size }]
 */
export function makeNewArray(
  product: RawProduct
): Array<{ inventory: number; size: any }> {
  const variants: any[] = product?.product_options?.[0]?.product_variants ?? [];
  return variants.map((cur) => ({
    inventory: cur.inventory,
    size: cur.size, // { id, size: "Small" | "9", slug? ... }
  }));
}
