import Link from "next/link";
import { DIRECTORY_ROLES, DIRECTORY_LOCATIONS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

interface Props {
  currentRoleSlug: string;
  currentLocationSlug: string;
}

export function RelatedContent({ currentRoleSlug, currentLocationSlug }: Props) {
  const relatedRoles = DIRECTORY_ROLES
    .filter(r => r.slug !== currentRoleSlug)
    .slice(0, 6);

  const relatedLocations = DIRECTORY_LOCATIONS
    .filter(l => l.slug !== currentLocationSlug)
    .slice(0, 6);

  return (
    <div className="space-y-10">
      <section>
        <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider mb-5">
          Similar Roles in {DIRECTORY_LOCATIONS.find(l => l.slug === currentLocationSlug)?.label || currentLocationSlug}
        </h3>
        <div className="grid gap-3">
          {relatedRoles.map(role => {
            const loc = DIRECTORY_LOCATIONS.find(l => l.slug === currentLocationSlug);
            return (
              <Link
                key={role.slug}
                href={`/jobs/${role.slug}-in-${currentLocationSlug}`}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all group"
              >
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{role.label}</span>
                  <span className="text-slate-400 text-sm ml-2">in {loc?.label || currentLocationSlug}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider mb-5">
          Top Cities for {DIRECTORY_ROLES.find(r => r.slug === currentRoleSlug)?.label || currentRoleSlug}
        </h3>
        <div className="grid gap-3">
          {relatedLocations.map(loc => {
            const role = DIRECTORY_ROLES.find(r => r.slug === currentRoleSlug);
            return (
              <Link
                key={loc.slug}
                href={`/jobs/${currentRoleSlug}-in-${loc.slug}`}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all group"
              >
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{role?.label || currentRoleSlug}</span>
                  <span className="text-slate-400 text-sm ml-2">in {loc.label}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
