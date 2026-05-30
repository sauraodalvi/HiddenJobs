import { CheckCircle2 } from "lucide-react";

interface AIAnswerBlockProps {
  question: string;
  answer: string;
  listItems?: string[];
  className?: string;
}

export function AIAnswerBlock({
  question,
  answer,
  listItems,
  className = "",
}: AIAnswerBlockProps) {
  return (
    <article
      className={`rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 p-8 ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="mt-1 shrink-0">
          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
            {question}
          </h3>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-prose">
            {answer}
          </p>
          {listItems && listItems.length > 0 && (
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              {listItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}
