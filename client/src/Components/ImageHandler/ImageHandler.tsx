import React, { useState } from "react";

function ImageHandler({ images }: { images: { url: string }[] }) {
  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-4">
      <div className="aspect-[4/5] w-full overflow-hidden rounded-xl border bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {images && images.length > 0 && (
          <img
            src={images[active]?.url}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((im, i) => (
          <button
            key={im.url}
            onClick={() => setActive(i)}
            className={`h-20 w-16 flex-none overflow-hidden rounded-lg border focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
              i === active ? "ring-2 ring-emerald-600" : ""
            }`}
            aria-label={`Show image ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={im.url} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ImageHandler;
