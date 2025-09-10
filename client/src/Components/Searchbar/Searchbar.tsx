"use client";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { Search as setSearch } from "@/redux/reducer/filterSlice";

type Props = {
  className?: string; // e.g. "right-14 top-1/2 -translate-y-1/2"
  widthRem?: number; // default 24rem (~w-96)
};

export default function SearchbarAlwaysOpen({
  className,
  widthRem = 24,
}: Props) {
  const [q, setQ] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  function submit(term: string) {
    const s = term.trim();
    if (!s) return;
    dispatch(setSearch({ searchterm: s }));
    router.push(`/products/search/${encodeURIComponent(s)}`);
  }

  return (
    // Absolute = removed from layout; won’t push nav/cart
    <div
      className={`absolute z-50 ${className ?? ""}`}
      style={{ width: `${widthRem}rem`, height: "2.5rem" }} // ≈ w-96, h-10
      role="search"
      aria-label="Search products"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(q);
        }}
        className="flex h-full items-center overflow-hidden rounded-full border border-neutral-300 bg-white/95 shadow-sm backdrop-blur"
      >
        <div className="pl-3 pr-1 text-neutral-600">
          <BiSearch size={18} />
        </div>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setQ(""); // Esc clears
          }}
          placeholder="Search products…"
          className="h-full flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
          aria-label="Search products"
        />
        <button
          type="submit"
          className="mr-1 inline-flex h-8 items-center rounded-full bg-emerald-600 px-3 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          Go
        </button>
      </form>
    </div>
  );
}
