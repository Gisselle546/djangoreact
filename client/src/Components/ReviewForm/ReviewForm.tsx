// Components/ReviewForm/ReviewForm.tsx
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createReview } from "@/redux/reducer/filterSlice";
import { selectIsAuthenticated } from "@/redux/reducer/userSlice";

/* ---------- Types (UI-facing) ---------- */
export type Review = {
  id: string;
  rating: number; // 1..5
  title?: string; // backend `name`
  body: string; // backend `comment`
  date: string; // ISO
  userId?: number | string | null;
  verified?: boolean;
  sizePurchased?: string;
  helpfulCount?: number;
};

type ReviewsProps = {
  productId: string | number; // required for POST/refresh
  reviews?: Review[] | null; // may be absent/null → treated as []
  onSubmit?: (r: {
    rating: number;
    title?: string;
    body: string;
    sizePurchased?: string;
  }) => void;
};

/* ---------- Helpers ---------- */
const clamp = (n: number, lo = 0, hi = 5) => Math.max(lo, Math.min(hi, n));
const avg = (arr: number[]) =>
  arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

/* ---------- Stars (supports partial fill) ---------- */
function Stars({ rating, size = 20 }: { rating: number; size?: number }) {
  const clamped = clamp(rating, 0, 5);
  const fills = Array.from({ length: 5 }, (_, i) =>
    Math.min(Math.max(clamped - i, 0), 1)
  );
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${clamped.toFixed(1)} out of 5`}
    >
      {fills.map((f, i) => (
        <div key={i} className="relative" style={{ width: size, height: size }}>
          {/* empty star */}
          <svg
            viewBox="0 0 20 20"
            className="absolute inset-0 text-slate-300"
            fill="currentColor"
            aria-hidden
          >
            <path d="M10 15.27l-5.18 3.04L6 12.97 1.82 9.24l5.91-.86L10 3l2.27 5.38 5.91.86L14 12.97l1.18 5.34z" />
          </svg>
          {/* filled portion */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${f * 100}%` }}
          >
            <svg
              viewBox="0 0 20 20"
              className="text-amber-500"
              fill="currentColor"
              aria-hidden
            >
              <path d="M10 15.27l-5.18 3.04L6 12.97 1.82 9.24l5.91-.86L10 3l2.27 5.38 5.91.86L14 12.97l1.18 5.34z" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Summary Card ---------- */
function ReviewsSummary({ reviews }: { reviews: Review[] }) {
  const stats = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<
      1 | 2 | 3 | 4 | 5,
      number
    >;
    for (const r of reviews)
      counts[clamp(r.rating, 1, 5) as 1 | 2 | 3 | 4 | 5] += 1;
    const total = reviews.length || 1;
    const distribution = (star: 1 | 2 | 3 | 4 | 5) =>
      Math.round((counts[star] / total) * 100);
    return {
      average: avg(reviews.map((r) => clamp(r.rating, 1, 5))),
      total: reviews.length,
      counts,
      distribution,
    };
  }, [reviews]);

  return (
    <div className="rounded-2xl border bg-white/70 shadow-sm p-6">
      <div className="flex items-center justify-between gap-6">
        <div>
          <div className="text-3xl font-bold">{stats.average.toFixed(1)}</div>
          <Stars rating={stats.average} size={22} />
          <div className="mt-1 text-sm text-slate-600">
            {stats.total} review{stats.total === 1 ? "" : "s"}
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-3">
              <span className="w-6 text-sm tabular-nums">{star}</span>
              <div className="relative h-2 flex-1 rounded-full bg-slate-200">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-emerald-600"
                  style={{
                    width: `${stats.distribution(star as 1 | 2 | 3 | 4 | 5)}%`,
                  }}
                />
              </div>
              <span className="w-10 text-right text-xs text-slate-600 tabular-nums">
                {stats.counts[star as 1 | 2 | 3 | 4 | 5]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- One Review Card ---------- */
function ReviewCard({ r }: { r: Review }) {
  return (
    <article className="rounded-2xl border bg-white/70 shadow-sm p-5">
      {r.title && <h4 className="font-medium">{r.title}</h4>}
      <p className="mt-1 text-sm text-slate-800 whitespace-pre-line">
        {r.body}
      </p>

      <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
        <div>
          {formatDate(r.date)}
          {r.verified && (
            <span className="ml-2 text-emerald-700 font-medium">Verified</span>
          )}
        </div>
        <div className="flex items-center">
          <Stars rating={r.rating} />
          <span className="ml-2 text-slate-600">{r.rating}/5</span>
        </div>
      </div>
    </article>
  );
}

/* ---------- List + Empty State ---------- */
function ReviewsList({ reviews }: { reviews: Review[] }) {
  const [sort, setSort] = useState<"new" | "rating">("new");
  const [starFilter, setStarFilter] = useState<number | "all">("all");

  const filtered = useMemo(() => {
    let arr = reviews.slice();
    if (starFilter !== "all")
      arr = arr.filter((r) => Math.round(r.rating) === starFilter);
    if (sort === "new") {
      arr.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    } else {
      arr.sort((a, b) => b.rating - a.rating);
    }
    return arr;
  }, [reviews, sort, starFilter]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">
          {filtered.length} review{filtered.length === 1 ? "" : "s"}
        </div>
        <div className="flex items-center gap-2">
          <select
            value={starFilter}
            onChange={(e) =>
              setStarFilter(
                e.target.value === "all" ? "all" : Number(e.target.value)
              )
            }
            className="rounded border px-2 py-1 text-sm"
            aria-label="Filter by rating"
          >
            <option value="all">All ratings</option>
            {[5, 4, 3, 2, 1].map((s) => (
              <option key={s} value={s}>
                {s} stars
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="rounded border px-2 py-1 text-sm"
            aria-label="Sort reviews"
          >
            <option value="new">Most recent</option>
            <option value="rating">Highest rating</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border bg-white/70 shadow-sm p-6 text-sm text-slate-600">
          No reviews yet — be the first!
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((r) => (
            <ReviewCard key={r.id} r={r} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Write Review Form (no author field) ---------- */
function ReviewForm({
  onSubmit,
}: {
  onSubmit?: (r: {
    rating: number;
    title?: string;
    body: string;
    sizePurchased?: string;
  }) => void;
}) {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [sizePurchased, setSizePurchased] = useState("");

  return (
    <form
      className="rounded-2xl border bg-white/70 shadow-sm p-6 space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.({ rating, title, body, sizePurchased });
        setRating(5);
        setTitle("");
        setBody("");
        setSizePurchased("");
      }}
    >
      <h3 className="font-medium">Write a review</h3>

      <div className="flex items-center gap-3">
        <label className="text-sm">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setRating(s)}
              className={`rounded px-2 py-1 text-sm ${
                rating >= s ? "bg-amber-100 border border-amber-300" : "border"
              }`}
              aria-label={`${s} stars`}
            >
              {s}★
            </button>
          ))}
        </div>
      </div>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full rounded border px-3 py-2 text-sm"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Share details about fit, quality, comfort..."
        className="w-full rounded border px-3 py-2 text-sm min-h-28"
      />
      <input
        value={sizePurchased}
        onChange={(e) => setSizePurchased(e.target.value)}
        placeholder="Size bought (e.g., M or US 9)"
        className="w-full rounded border px-3 py-2 text-sm"
      />

      <button
        type="submit"
        className="rounded-xl bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700"
      >
        Submit review
      </button>
    </form>
  );
}

/* ---------- Main Wrapper: uses Redux auth to gate form ---------- */
export default function Reviews({
  productId,
  reviews,
  onSubmit,
}: ReviewsProps) {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsAuthenticated);

  // Local working list (supports optimistic add)
  const [list, setList] = useState<Review[]>(
    Array.isArray(reviews) ? reviews : []
  );
  useEffect(() => {
    setList(Array.isArray(reviews) ? reviews : []);
  }, [reviews]);

  const submit = async (r: {
    rating: number;
    title?: string;
    body: string;
    sizePurchased?: string;
  }) => {
    if (!isLoggedIn) return;
    try {
      // Map UI → backend fields
      await dispatch(
        createReview({
          filter_type: "products",
          product_id: productId,
          data: {
            rating: r.rating,
            name: r.title ?? "", // backend expects `name` as TITLE
            comment: r.body, // backend expects `comment` as BODY
          },
        })
      ).unwrap();

      // Optimistic add (or refetch for canonical data)
      setList((prev) => [
        {
          id: Math.random().toString(36).slice(2),
          title: r.title ?? "",
          body: r.body,
          rating: r.rating,
          date: new Date().toISOString(),
          verified: true,
          sizePurchased: r.sizePurchased,
          helpfulCount: 0,
        },
        ...prev,
      ]);

      // Optionally re-fetch product to include server-created review:
      // await dispatch(filterProductMethod({ filter_type: "products", product_id: productId }));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = onSubmit ?? submit;

  return (
    <section className="space-y-6">
      <ReviewsSummary reviews={list} />
      <ReviewsList reviews={list} />

      {isLoggedIn ? (
        <ReviewForm onSubmit={handleSubmit} />
      ) : (
        <div className="rounded-2xl border bg-white/70 shadow-sm p-6 text-sm text-slate-600 flex items-center justify-between">
          <span>Sign in to write a review.</span>
          <a
            href="/login"
            className="rounded-xl bg-emerald-600 px-3 py-2 text-white font-semibold hover:bg-emerald-700"
          >
            Sign in
          </a>
        </div>
      )}
    </section>
  );
}
