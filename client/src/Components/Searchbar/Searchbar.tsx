// Searchbar.tsx
"use client";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { Search as setSearch } from "@/redux/reducer/filterSlice";

type Props = {
  className?: string;
  widthRem?: number;
};

export default function Searchbar({ className, widthRem = 24 }: Props) {
  const [q, setQ] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  async function submit(term: string) {
    const clean = term.trim().replace(/\s+/g, " ");
    if (!clean) return;

    // 1) Hit your unified /products/search-results/?query=<clean>
    await dispatch(setSearch({ searchterm: clean }));

    // 2) Send the user to your results UI
    // Pick ONE of these patterns, depending on what page you already have:

    // a) Keep your existing dynamic route page:
    router.push(`/products/search/${encodeURIComponent(clean)}`);

    // b) Or switch to a simple querystring page (if you have /products/search):
    // router.push(`/products/search?query=${encodeURIComponent(clean)}`);
  }

  return (
    <div
      className={`absolute z-50 ${className ?? ""}`}
      style={{ width: `${widthRem}rem`, height: "2.5rem" }}
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
            if (e.key === "Escape") setQ("");
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
