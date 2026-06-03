import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getBlogPost, getRelatedPosts, BLOG_POSTS } from "@/content/blog";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { ShareButtons } from "@/components/common/ShareButtons";
import { getBaseUrl } from "@/lib/domain";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | HiddenJobs Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 2);
  const baseUrl = await getBaseUrl();
  const url = `${baseUrl}/blog/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "HiddenJobs",
      url: baseUrl,
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-20 pb-32">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article>
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span className="text-slate-300">|</span>
              <span>{post.author}</span>
            </div>
          </header>

          <div
            className="prose prose-slate dark:prose-invert max-w-none prose-lg prose-headings:font-black prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-primary prose-code:text-primary prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-li:marker:text-primary"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-sm font-medium text-slate-500">Share this article:</span>
              <ShareButtons url={url} title={post.title} />
            </div>
          </footer>
        </article>

        {related.length > 0 && (
          <section className="mt-20 pt-12 border-t border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8">Related Articles</h2>
            <div className="grid gap-6">
              {related.map(r => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group block bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:border-primary transition-all"
                >
                  <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors mb-2">
                    {r.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2">{r.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-primary font-bold mt-3 uppercase tracking-widest">
                    Read More <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
