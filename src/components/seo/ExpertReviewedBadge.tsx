import { ShieldCheck } from "lucide-react";

interface ExpertReviewedBadgeProps {
  variant?: "expert-reviewed" | "verified-data";
  className?: string;
}

export function ExpertReviewedBadge({
  variant = "expert-reviewed",
  className = "",
}: ExpertReviewedBadgeProps) {
  const label =
    variant === "expert-reviewed" ? "Expert Reviewed" : "Verified Data";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 ${className}`}
    >
      <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}
