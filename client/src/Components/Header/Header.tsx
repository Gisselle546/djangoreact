"use client";

import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo-grey.png";
import { useRouter } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";

import { useStore } from "@/context/cart";
import Link from "next/dist/client/link";
import Searchbar from "../Searchbar/Searchbar";

function HeaderContainer() {
  const router = useRouter();
  const { state } = useStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const count = mounted
    ? state.cart.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-600 backdrop-blur">
      <div className="page-container relative py-3 flex items-center justify-between gap-6">
        <Link href="/" className="font-semibold">
          <img src={logo.src} alt="Logo" className="h-10 w-auto" />
        </Link>
        <nav className="text-sm md:text-lg text-slate-600 flex gap-4">
          <Link className="font-head font-bold" href="/footwear">
            Footwear
          </Link>
          <Link className="font-head font-bold" href="/players">
            Players
          </Link>
          <Link className="font-head  font-bold" href="/clubs">
            Clubs
          </Link>
          <Link className="font-head font-bold" href="/national">
            National Teams
          </Link>
        </nav>
        <Searchbar className="right-24 top-1/2 -translate-y-1/2 hidden md:block" />
        <button
          type="button"
          onClick={() => router.push("/cart")}
          className="relative inline-flex items-center justify-center p-2 rounded hover:bg-slate-100 transition"
          aria-label="Cart"
        >
          <FiShoppingCart size={22} className="cursor-pointer" />
          {mounted && count > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[11px] font-medium flex items-center justify-center leading-none">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

export default HeaderContainer;
