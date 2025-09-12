"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

type BannerItem = {
  name: string;
  image: string | StaticImageData;
  heading: string;
  url?: string;
};

type BannerProps = { data: BannerItem[] };

export default function Banner({ data }: BannerProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(0,0,0,0.04),rgba(0,0,0,0)_70%)]" />

      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="h-64 sm:h-80 lg:h-[28rem]">
          <div
            className="group flex h-full gap-2 [--shrink:0.8] [--grow:2.4] supports-[hover:hover]:group-hover:[&>a]:[flex:var(--shrink)_1_0%]"
            data-active={active !== null}
          >
            {data.map((it, i) => {
              const isStatic = typeof it.image !== "string";
              const src = it.image as any;
              const hasBlur =
                isStatic && (src as StaticImageData).blurDataURL != null;

              return (
                <a
                  key={i}
                  href={it.url ?? "#"}
                  onClick={(e) => {
                    e.preventDefault();
                    setActive((prev) => (prev === i ? null : i));
                  }}
                  className="relative h-full flex-[1_1_0%] overflow-hidden rounded-2xl border border-slate-200/40 bg-white/40 shadow-lg transition-[flex] duration-500 ease-out hover:[flex:var(--grow)_1_0%] backdrop-blur-[2px]"
                  style={
                    active === i
                      ? { flex: "var(--grow) 1 0%" }
                      : active !== null
                      ? { flex: "var(--shrink) 1 0%" }
                      : undefined
                  }
                >
                  <div className="absolute inset-0">
                    <Image
                      src={src}
                      alt={it.name || ""}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      priority={i === 0}
                      placeholder={hasBlur ? "blur" : "empty"}
                    />
                  </div>

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

                  <div className="absolute left-4 right-4 bottom-4">
                    <div className="rounded-lg bg-black/35 px-3 py-2 text-white backdrop-blur">
                      <h3 className="font-medium">{it.name}</h3>
                      <p className="mt-0.5 text-sm opacity-90">{it.heading}</p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
