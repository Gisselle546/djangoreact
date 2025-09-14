type SpinnerProps = {
  /** 'sm' | 'md' | 'lg' or a pixel number (e.g. 28) */
  size?: "sm" | "md" | "lg" | number;
  /** stroke width for the ring variant (in px) */
  thickness?: number;
  /** visual style */
  variant?: "ring" | "dots";
  /** extra classes (use Tailwind here, e.g. "text-sky-600") */
  className?: string;
  /** screen reader label */
  label?: string;
};

const sizeMap = { sm: 16, md: 20, lg: 24 };

export default function Spinner({
  size = "md",
  thickness = 3,
  variant = "ring",
  className = "",
  label = "Loading…",
}: SpinnerProps) {
  const px = typeof size === "number" ? size : sizeMap[size] ?? sizeMap.md;

  if (variant === "dots") {
    const dot = Math.max(6, Math.round(px / 4));
    return (
      <div
        role="status"
        aria-live="polite"
        aria-label={label}
        className={`inline-flex items-center gap-1 ${className}`}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="inline-block rounded-full bg-current animate-bounce"
            style={{
              width: dot,
              height: dot,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  // ring variant
  const r = (px - thickness) / 2;
  const c = 2 * Math.PI * r;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={`inline-flex ${className}`}
    >
      <svg
        width={px}
        height={px}
        viewBox={`0 0 ${px} ${px}`}
        className="animate-spin"
      >
        {/* track */}
        <circle
          cx={px / 2}
          cy={px / 2}
          r={r}
          stroke="currentColor"
          strokeOpacity={0.2}
          strokeWidth={thickness}
          fill="none"
        />
        {/* indicator */}
        <circle
          cx={px / 2}
          cy={px / 2}
          r={r}
          stroke="currentColor"
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * 0.75}
          fill="none"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}
