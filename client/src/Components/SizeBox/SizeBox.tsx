import React from "react";

/** ---- Types ---- */
export type SizeLike = {
  id: number | string;
  label?: string;
  name?: string;
  size?: string;
  slug?: string;
};

export type VariantInput = {
  inventory: number;
  size: SizeLike;
};

export type SizeOption = string | { size: SizeLike } | SizeLike;

const ORDER = ["XS", "S", "M", "L", "XL", "XXL"] as const;
type ApparelCode = (typeof ORDER)[number];

function toApparelCode(str: string): ApparelCode | undefined {
  const s = String(str).trim().toLowerCase();
  if (s === "xs" || s.startsWith("x-small")) return "XS";
  if (s === "s" || s === "small") return "S";
  if (s === "m" || s === "medium") return "M";
  if (s === "l" || s === "large") return "L";
  if (s === "xl" || s.startsWith("x-large")) return "XL";
  if (s === "xxl" || s.startsWith("xx-large")) return "XXL";
  return undefined;
}

const rawLabel = (sz: SizeLike) =>
  sz.label ?? sz.size ?? sz.name ?? sz.slug ?? String(sz.id);

const toNumber = (label: string) => {
  const s = String(label).trim();

  if (!/[0-9]/.test(s)) return undefined;

  const normalized = s.replace(/½/g, ".5");

  const cleaned = normalized.replace(/[^0-9.]/g, "");

  if (cleaned === "" || cleaned === ".") return undefined;

  const n = Number(cleaned);
  return Number.isFinite(n) ? n : undefined;
};

type Item = {
  id: number | string;
  label: string;
  norm?: ApparelCode;
  value?: number;
  inventory: number;
  size: SizeLike;
};

function buildItems(variants: VariantInput[]): Item[] {
  const labels = variants.map((v) => rawLabel(v.size));
  const numericCount = labels
    .map(toNumber)
    .filter((n) => n !== undefined).length;
  const isShoe = numericCount >= Math.ceil(labels.length * 0.6);

  const map = new Map<string, Item>();

  for (const v of variants) {
    const sz = v.size;
    const label = rawLabel(sz);
    const value = toNumber(label);
    const norm = toApparelCode(label);

    const key = isShoe
      ? value !== undefined
        ? String(value)
        : label.toLowerCase()
      : norm ?? label.toUpperCase();

    const existing = map.get(key);
    if (existing) {
      existing.inventory += v.inventory;
    } else {
      map.set(key, {
        id: sz.id,
        label: isShoe
          ? value !== undefined
            ? String(value)
            : label
          : norm ?? label,
        norm: norm,
        value: value,
        inventory: v.inventory,
        size: sz,
      });
    }
  }

  const items = Array.from(map.values());

  if (items.some((i) => i.value !== undefined)) {
    items.sort(
      (a, b) =>
        (a.value ?? Number.POSITIVE_INFINITY) -
        (b.value ?? Number.POSITIVE_INFINITY)
    );
  } else if (items.some((i) => i.norm)) {
    const rank = new Map<ApparelCode, number>(ORDER.map((c, i) => [c, i]));
    items.sort(
      (a, b) =>
        (rank.get(a.norm as ApparelCode) ?? 999) -
        (rank.get(b.norm as ApparelCode) ?? 999)
    );
  } else {
    items.sort((a, b) => a.label.localeCompare(b.label));
  }

  return items;
}

function selectionEquals(sel: SizeOption | undefined, item: Item): boolean {
  if (!sel) return false;

  const matchesByLabel = (label: string) => {
    const a = label.toLowerCase();
    const b = item.label.toLowerCase();

    const codeA = toApparelCode(label);
    if (item.norm && codeA) {
      return codeA === item.norm;
    }

    return a === b;
  };

  if (typeof sel === "string") {
    return matchesByLabel(sel);
  }

  const maybeWrap = (sel as any).size as SizeLike | undefined;
  if (maybeWrap) {
    if (maybeWrap.id != null && String(maybeWrap.id) === String(item.id)) {
      return true;
    }
    const sLabel = rawLabel(maybeWrap);
    return matchesByLabel(sLabel);
  }

  const s = sel as SizeLike;
  if (s.id != null && String(s.id) === String(item.id)) return true;
  return matchesByLabel(rawLabel(s));
}

export default function SizeBox({
  variants,
  selected,
  onChange,
  title = "Size",
  showGuide = true,
}: {
  variants: VariantInput[];
  selected?: SizeOption;
  onChange: (s: SizeOption) => void;
  title?: string;
  showGuide?: boolean;
}) {
  const items = buildItems(variants);

  return (
    <fieldset className="space-y-3">
      <div className="flex w-1/2 items-center justify-between">
        <legend className="text-sm font-medium text-slate-700">{title}</legend>
        {showGuide && (
          <button
            type="button"
            className="text-sm underline underline-offset-2 hover:text-emerald-700"
          >
            Size guide
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const soldOut = item.inventory <= 0;
          const checked = selectionEquals(selected, item);

          return (
            <label
              key={item.id}
              title={soldOut ? "Out of stock" : `${item.inventory} in stock`}
              className="relative"
            >
              {/* We keep an input for a11y, but control checked manually */}
              <input
                type="radio"
                name="size"
                className="peer sr-only"
                checked={checked}
                readOnly
                disabled={soldOut}
              />
              <span
                onClick={() => !soldOut && onChange({ size: item.size })}
                className={[
                  "inline-flex min-w-[3rem] items-center justify-center rounded-lg border px-3 py-2 text-sm select-none",
                  soldOut
                    ? "opacity-40 line-through cursor-not-allowed"
                    : "cursor-pointer hover:bg-slate-50",
                  checked
                    ? "border-emerald-600 ring-2 ring-emerald-600"
                    : "border-slate-300",

                  item.value !== undefined ? "tabular-nums" : "",
                ].join(" ")}
                aria-label={`${item.label}${soldOut ? " (Sold out)" : ""}`}
              >
                {item.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
