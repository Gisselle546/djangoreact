"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  filterProductMethod,
  filterProduct,
  selectStatus,
  error as selectError,
} from "@/redux/reducer/filterSlice";
import { useStore } from "@/context/cart";
import ImageHandler from "@/Components/ImageHandler/ImageHandler";
import SizeBox, { SizeOption } from "@/Components/SizeBox/SizeBox";
import { buildSizeModel, NormalizedSize } from "@/utils/size";
import Reviews from "@/Components/ReviewForm/ReviewForm";
import Spinner from "@/Components/Spinner/Spinner";

const parsePrice = (p: unknown): number =>
  typeof p === "number" ? p : Number(String(p).replace(/[^0-9.-]/g, "")) || 0;

const currencyUSD = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n
  );

type SizeLike = {
  id?: string | number;
  label?: string;
  name?: string;
  size?: string;
  slug?: string;
};
function hasSizeProp(x: unknown): x is { size: SizeLike } {
  return !!x && typeof x === "object" && "size" in (x as any);
}
function extractSize(row: unknown): { sid?: string | number; slabel?: string } {
  if (hasSizeProp(row)) {
    const s = (row as any).size as SizeLike;
    return {
      sid: s?.id,
      slabel:
        s?.label ??
        s?.size ??
        s?.name ??
        s?.slug ??
        (typeof s === "string" ? s : undefined),
    };
  }
  if (row && typeof row === "object") {
    const r = row as SizeLike;
    return { sid: r?.id, slabel: r?.label ?? r?.size ?? r?.name ?? r?.slug };
  }
  if (typeof row === "string") return { slabel: row };
  return {};
}

export default function ProductClient() {
  // Grab param id/slug
  const params = useParams<Record<string, string>>();
  const raw =
    params?.id ?? params?.product_id ?? params?.slug ?? params?.product;
  const id = raw && /^\d+$/.test(raw) ? Number(raw) : raw;

  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  const product = useAppSelector(filterProduct);
  const { addCart } = useStore();

  // SizeBox selection (your existing API)
  const [selected, setSelected] = useState<SizeOption | undefined>(undefined);
  // Normalized selection (for variant/images/cart correctness)
  const [selectedNorm, setSelectedNorm] = useState<NormalizedSize | undefined>(
    undefined
  );
  const [adding, setAdding] = useState(false);
  const fetchedFor = useRef<string | number | null>(null);

  useEffect(() => {
    if (!id) return;
    if (fetchedFor.current === id) return;
    fetchedFor.current = id;

    dispatch(
      filterProductMethod({
        filter_type: "products",
        product_id: id,
      })
    );
  }, [dispatch, id]);

  if (!id) return <div>No product ID provided.</div>;
  if (status === "loading")
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found.</div>;

  const newArray = product?.product_options[0].product_variants.reduce(
    (acc: any, cur: any) => {
      acc.push({
        inventory: cur.inventory,
        size: cur.size, // { id, size/label/slug... }
      });
      return acc;
    },
    []
  );

  const sizesNorm = buildSizeModel(product);
  const normById = new Map(sizesNorm.map((s) => [String(s.id), s]));

  const handleSizeChange = (row: SizeOption) => {
    setSelected(row);
    const { sid, slabel } = extractSize(row);

    let norm = sid != null ? normById.get(String(sid)) : undefined;
    if (!norm && slabel) {
      norm = sizesNorm.find(
        (n) => String(n.label).toLowerCase() === String(slabel).toLowerCase()
      );
    }
    setSelectedNorm(norm);
  };

  const variants = product?.product_options?.[0]?.product_variants ?? [];

  const galleryImages =
    (selectedNorm as any)?.variant?.images ?? variants?.[0]?.images;

  const unitPrice = parsePrice(product.price);

  const uiReviews = Array.isArray(product?.review)
    ? product.review.map((r: any) => ({
        id: String(r.id),
        title: r.name ?? "", // ← TITLE from backend `name`
        body: r.comment ?? "", // ← BODY from backend `comment`
        rating: Number(r.rating) || 0,
        date: r.createdAt ?? r.created_at ?? new Date().toISOString(),
        userId: r.user ?? null, // keep user id if you want
        verified: r.user != null, // simple rule: has user → Verified
      }))
    : [];

  const handleAddToCart = () => {
    if (!selected) return;

    const { sid, slabel } = extractSize(selected);

    // Pick the exact variant: prefer from normalized; else by size.id; else first
    const vFromNorm = (selectedNorm as any)?.variant;
    const variant =
      vFromNorm ?? variants.find((v: any) => v.size?.id === sid) ?? variants[0];

    const primaryImage =
      variant?.images?.[0]?.url ??
      variant?.images?.[0]?.image_url ??
      variant?.images?.[0] ??
      product?.primary_image ??
      product?.images?.[0];

    addCart({
      data: {
        id: product.id ?? product.product_id ?? String(id),
        name: product.name,
        price: unitPrice, // store number in cart
        size: {
          id: selectedNorm?.id ?? sid ?? String(slabel ?? "UNKNOWN"),
          label: selectedNorm?.label ?? slabel ?? String(sid ?? "UNKNOWN"),
        },
        variantId: variant?.id,
        image: primaryImage,
      },
      quantity: 1,
    });

    setAdding(true);
    setTimeout(() => setAdding(false), 900);
  };

  return (
    <div className="min-h-dvh bg-white text-slate-900 antialiased">
      <div className="page-container">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left */}
          <div className="section-y">
            <ImageHandler images={galleryImages} />
          </div>

          {/* Right */}
          <div className="section-y">
            <div className="max-w-md space-y-8">
              {/* Title + price */}
              <header className="space-y-2">
                <h1 className="font-head text-2xl font-bold leading-tight text-slate-900">
                  {product.name}
                </h1>
                <p className="text-lg font-semibold leading-normal">
                  {currencyUSD(unitPrice)}
                </p>
              </header>

              {/* Size selector (your SizeBox) */}
              <div>
                <SizeBox
                  variants={newArray}
                  selected={selected}
                  onChange={handleSizeChange} // ← bridge to normalized
                />
              </div>

              {/* CTA + accordion */}
              <div className="space-y-15">
                <button
                  type="button"
                  disabled={!selected}
                  className="w-full rounded-xl cursor-pointer bg-emerald-600 px-5 py-3 text-white font-bold disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={handleAddToCart}
                >
                  {selected
                    ? adding
                      ? "Added!"
                      : "Add to cart"
                    : "Select a size to continue"}
                </button>

                {/* Accordion wrapper */}
                <div className="rounded-2xl border bg-white/70 shadow-sm divide-y [&_summary::-webkit-details-marker]:hidden">
                  <details className="group open:shadow-inner open:bg-slate-50/70 transition">
                    <summary className="flex items-center justify-between gap-3 cursor-pointer select-none p-4 md:p-5 focus:outline-none hover:bg-slate-50/60 focus-visible:ring-2 focus-visible:ring-emerald-600 text-sm md:text-base font-medium text-slate-900">
                      <span>Product description</span>
                      <svg
                        className="size-5 shrink-0 transition-transform group-open:rotate-180"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 111.04 1.08l-4.23 3.36a.75.75 0 01-.94 0L5.21 8.31a.75.75 0 01.02-1.1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </summary>
                    <div className="px-4 pb-4 md:px-5 md:pb-5">
                      <div className="prose prose-sm prose-slate max-w-none leading-relaxed">
                        <p>{product.description}</p>
                      </div>
                    </div>
                  </details>

                  <details className="group open:bg-slate-50/70 transition">
                    <summary className="flex items-center justify-between gap-3 cursor-pointer select-none p-4 md:p-5 hover:bg-slate-50/60 focus-visible:ring-2 focus-visible:ring-emerald-600 text-sm md:text-base font-medium text-slate-900">
                      <span>Composition & care</span>
                      <svg
                        className="size-5 shrink-0 transition-transform group-open:rotate-180"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 111.04 1.08l-4.23 3.36a.75.75 0 01-.94 0L5.21 8.31a.75.75 0 01.02-1.1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </summary>
                    <div className="px-4 pb-4 md:px-5 md:pb-5">
                      <div className="prose prose-sm prose-slate max-w-none whitespace-pre-line leading-relaxed">
                        {product.highlights}
                      </div>
                    </div>
                  </details>

                  <details className="group open:bg-slate-50/70 transition">
                    <summary className="flex items-center justify-between gap-3 cursor-pointer select-none p-4 md:p-5 hover:bg-slate-50/60 focus-visible:ring-2 focus-visible:ring-emerald-600 text-sm md:text-base font-medium text-slate-900">
                      <span>Size & fit</span>
                      <svg
                        className="size-5 shrink-0 transition-transform group-open:rotate-180"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 111.04 1.08l-4.23 3.36a.75.75 0 01-.94 0L5.21 8.31a.75.75 0 01.02-1.1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </summary>
                    <div className="px-4 pb-4 md:px-5 md:pb-5">
                      <div className="prose prose-sm prose-slate max-w-none whitespace-pre-line leading-relaxed">
                        {product.details}
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>
          <Reviews reviews={uiReviews} productId={product.id} />
        </div>
      </div>
    </div>
  );
}
