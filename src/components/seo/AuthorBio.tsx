import Image from "next/image";

interface AuthorBioProps {
  name: string;
  avatarUrl: string;
  credentials: string;
  bio: string;
  className?: string;
}

export function AuthorBio({
  name,
  avatarUrl,
  credentials,
  bio,
  className = "",
}: AuthorBioProps) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 p-8 ${className}`}
    >
      <div className="flex items-start gap-5">
        <div className="relative shrink-0">
          <Image
            src={avatarUrl}
            alt={`Headshot of ${name}, ${credentials}`}
            width={64}
            height={64}
            className="rounded-full object-cover ring-2 ring-white dark:ring-slate-700"
          />
        </div>
        <div className="space-y-2">
          <div>
            <strong className="text-lg font-bold text-slate-900 dark:text-white">
              {name}
            </strong>
            <span className="ml-2 text-sm font-medium text-primary">
              {credentials}
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-prose">
            {bio}
          </p>
        </div>
      </div>
    </section>
  );
}
