import { StaticImageData } from "next/image";
import React, { useState } from "react";

type imageData = {
  name: string;
  image: StaticImageData;
  heading: string;
  url: any;
};

type BannerProps = {
  data: Array<imageData>;
};

function Banner({ data }: BannerProps) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="relative">
      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.07),rgba(255,255,255,0)_70%)]" />

      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        {/* Pin the height so expansion is horizontal-only */}
        <div className="h-64 sm:h-80 lg:h-[28rem]">
          <div
            className="group flex h-full gap-2 [--shrink:0.8] [--grow:2.4]
supports-[hover:hover]:group-hover:[&>a]:[flex:var(--shrink)_1_0%]"
            data-active={active !== null}
          >
            {data.map((it, i) => (
              <a
                key={i}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActive((prev) => (prev === i ? null : i));
                }}
                className="relative h-full flex-[1_1_0%] overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/30 shadow-lg transition-[flex] duration-500 ease-out hover:[flex:var(--grow)_1_0%]"
                style={
                  active === i
                    ? { flex: "var(--grow) 1 0%" }
                    : active !== null
                    ? { flex: "var(--shrink) 1 0%" }
                    : undefined
                }
              >
                <img
                  src={typeof it.image === "string" ? it.image : it.image.src}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute left-4 right-4 bottom-4">
                  <div className="rounded-lg bg-black/40 px-3 py-2 backdrop-blur text-center">
                    <h3 className="font-medium">{it.name}</h3>
                    <p className="mt-0.5 text-sm text-neutral-300">
                      {it.heading}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
