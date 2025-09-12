"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type CardData = {
  id: number;
  location: string;
  logo_url: string;
  name: string;
  team_type: "CLUB" | "NATIONAL" | string;
  primary_image?: string;
  first_name?: string;
  last_name?: string;
  image_url?: string;
};

type Props = { data: CardData };

export default function Card({ data }: Props) {
  const {
    name,
    location,
    team_type,
    primary_image,
    first_name,
    last_name,
    image_url,
    logo_url,
  } = data;

  const router = useRouter();

  const title =
    name || [first_name, last_name].filter(Boolean).join(" ") || "Listing";

  const imgSrc = primary_image || image_url || logo_url || "/placeholder.jpg";

  const handleClick = () => {
    if (first_name) {
      router.push(
        `/players/${encodeURIComponent(
          first_name
        )}?last_name=${encodeURIComponent(last_name ?? "")}`
      );
      return;
    }
    const team = team_type === "CLUB" ? "clubs" : "national";
    router.push(`/${team}/${encodeURIComponent(name)}`);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={title}
      onClick={handleClick}
      onKeyDown={handleKey}
      className="
        group relative isolate w-full cursor-pointer
        rounded-2xl border border-emerald-100 bg-white
        shadow-sm ring-1 ring-black/5
        transition-all duration-300
        hover:-translate-y-0.5 hover:shadow-md hover:shadow-emerald-100
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600
      "
    >
      {/* Media */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <div className="relative h-52 bg-emerald-50">
          <Image
            src={imgSrc}
            alt={title}
            fill
            sizes="(min-width:1024px) 400px, (min-width:640px) 50vw, 100vw"
            className="object-contain p-3"
            unoptimized
          />
        </div>
      </div>
      {/* Body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-semibold tracking-tight text-slate-900">
              {title}
            </h3>
            {location && (
              <p className="mt-0.5 truncate text-xs text-slate-600">
                {location}
              </p>
            )}
          </div>

          {/* Minimal chevron (no label text) */}
          <span
            className="
              mt-1 inline-flex h-6 w-6 items-center justify-center
              rounded-full border border-emerald-100 bg-white
              opacity-0 shadow-sm transition
              group-hover:opacity-100 group-hover:translate-x-0.5
            "
            aria-hidden
          >
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 stroke-slate-700"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>

      {/* Subtle inset outline on hover */}
      <div
        className="
          pointer-events-none absolute inset-0 rounded-2xl
          ring-1 ring-inset ring-transparent transition
          group-hover:ring-emerald-200/70
        "
      />
    </div>
  );
}
