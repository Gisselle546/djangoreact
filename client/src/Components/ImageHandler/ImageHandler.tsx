import React, { useEffect, useState } from "react";

type Img = { url?: string } | string;

function ImageHandler({ images = [] as Img[] }) {
  // 1) Hooks at the top
  const [active, setActive] = useState(0);

  // 2) Normalize to a list of URLs (drop falsy)
  const urls = (images ?? [])
    .map((im) => (typeof im === "string" ? im : im?.url))
    .filter((u): u is string => Boolean(u));

  // 3) If the list shrinks, keep "active" in range
  useEffect(() => {
    if (active >= urls.length) setActive(0);
  }, [urls.length, active]);

  // 4) Render fallback _after_ hooks
  if (urls.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <div className="grid gap-4">
      <div className="aspect-[4/5] w-full overflow-hidden rounded-xl border bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={urls[active]} className="h-full w-full object-cover" alt="" />
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {urls.map((src, i) => (
          <button
            key={`${src}-${i}`}
            onClick={() => setActive(i)}
            className={[
              "h-20 w-16 flex-none overflow-hidden rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-600",
              i === active ? "ring-2 ring-emerald-600" : "",
            ].join(" ")}
            aria-label={`Show image ${i + 1}`}
            type="button"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} className="h-full w-full object-cover" alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ImageHandler;
