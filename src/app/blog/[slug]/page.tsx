import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getBlogPost, getRelatedPosts, BLOG_POSTS } from "@/content/blog";
import { getAuthorByName } from "@/content/authors";
import { Calendar, Clock, ArrowLeft, ArrowRight, User, ShieldCheck } from "lucide-react";
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

  const author = getAuthorByName(post.author);
  const related = getRelatedPosts(slug, 2);
  const baseUrl = await getBaseUrl();
  const url = `${baseUrl}/blog/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: author ? {
      "@type": "Person",
      name: author.name,
      jobTitle: author.role,
      url: `${baseUrl}/authors#${author.id}`
    } : { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "HiddenJobs",
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    }
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
            <div className="flex items-center gap-4 text-sm text-slate-400 font-medium border-y border-slate-100 dark:border-slate-800 py-3">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1">
                <User className="w-4 h-4 text-primary" />
                <Link href="/authors" className="hover:underline font-bold text-slate-600 dark:text-slate-300">
                  {post.author}
                </Link>
              </span>
            </div>
          </header>

          <div
            className="prose prose-slate dark:prose-invert max-w-none prose-lg prose-headings:font-black prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-primary prose-code:text-primary prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-li:marker:text-primary mb-16"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* E-E-A-T Author Bio block */}
          {author && (
            <section className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 mb-16 flex gap-6 items-start">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center text-white text-xl font-black flex-shrink-0">
                {author.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">{author.name}</h3>
                  <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 text-[9px] font-black uppercase tracking-widest">
                    <ShieldCheck className="w-2.5 h-2.5" /> Verified Author
                  </span>
                </div>
                <p className="text-xs font-semibold text-primary">{author.role}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {author.bio}
                </p>
                <Link href="/authors" className="inline-block text-xs font-black text-primary hover:underline uppercase tracking-wider">
                  View full credentials & articles →
                </Link>
              </div>
            </section>
          )}

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
