import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BLOG_POSTS } from "@/content/blog";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Hidden Jobs Blog | ATS Job Search Guides & Tips",
  description: "Learn how to find unlisted jobs on Greenhouse, Lever, Ashby, and Workday. Expert guides on ATS job search, direct applications, and bypassing LinkedIn.",
};

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-20 pb-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
            Hidden Jobs <span className="text-primary">Blog</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Guides, strategies, and insider tips for finding unlisted jobs directly on ATS platforms before they reach mainstream boards.
          </p>
        </div>

        <div className="space-y-8">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 hover:border-primary transition-all group shadow-sm active:scale-[0.99]"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
                {post.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
