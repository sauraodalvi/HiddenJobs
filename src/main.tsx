import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./app/globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { usePathname } from "@/lib/next-nav-shim";

// Lazy load page components for optimal bundle performance
const HomePage = lazy(() => import("./app/page"));
const AboutPage = lazy(() => import("./app/about/page"));
const AuthorsPage = lazy(() => import("./app/authors/page"));
const AutoApplyPage = lazy(() => import("./app/auto-apply/page"));
const AutoApplyGuidePage = lazy(() => import("./app/auto-apply-guide/page"));
const BlogPage = lazy(() => import("./app/blog/page"));
const BlogPostPage = lazy(() => import("./app/blog/[slug]/page"));
const CompanyHubPage = lazy(() => import("./app/company/[domain]/page"));
const ExplorePage = lazy(() => import("./app/explore/page"));
const JobMapPage = lazy(() => import("./app/job-map/page"));
const JobsPage = lazy(() => import("./app/jobs/page"));
const JobsLocationPage = lazy(() => import("./app/jobs/location/[location]/page"));
const JobsPlatformPage = lazy(() => import("./app/jobs/platform/[platform]/page"));
const JobsRolePage = lazy(() => import("./app/jobs/role/[role]/page"));
const PricingPage = lazy(() => import("./app/pricing/page"));
const PrivacyPage = lazy(() => import("./app/privacy/page"));
const ResourcesPage = lazy(() => import("./app/resources/page"));
const TermsPage = lazy(() => import("./app/terms/page"));
const TestSearchPage = lazy(() => import("./app/test-search/page"));
const AtsSearchQueryGeneratorPage = lazy(() => import("./app/tools/ats-search-query-generator/page"));
const NotFoundPage = lazy(() => import("./app/not-found"));

function PageLoader() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-slate-400">Loading page...</p>
      </div>
    </div>
  );
}

function Router() {
  const pathname = usePathname() || "/";

  // Normalize pathname: remove trailing slash if not root
  const cleanPath = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  // Static routes
  if (cleanPath === "/" || cleanPath === "") return <HomePage />;
  if (cleanPath === "/about") return <AboutPage />;
  if (cleanPath === "/authors") return <AuthorsPage />;
  if (cleanPath === "/auto-apply") return <AutoApplyPage />;
  if (cleanPath === "/auto-apply-guide") return <AutoApplyGuidePage />;
  if (cleanPath === "/blog") return <BlogPage />;
  if (cleanPath === "/explore") return <ExplorePage />;
  if (cleanPath === "/job-map") return <JobMapPage />;
  if (cleanPath === "/jobs") return <JobsPage />;
  if (cleanPath === "/pricing") return <PricingPage />;
  if (cleanPath === "/privacy") return <PrivacyPage />;
  if (cleanPath === "/resources") return <ResourcesPage />;
  if (cleanPath === "/terms") return <TermsPage />;
  if (cleanPath === "/test-search") return <TestSearchPage />;
  if (cleanPath === "/tools" || cleanPath === "/tools/ats-search-query-generator") return <AtsSearchQueryGeneratorPage />;

  // Dynamic routes
  // /blog/:slug
  if (cleanPath.startsWith("/blog/")) {
    const slug = cleanPath.replace("/blog/", "");
    if (slug) {
      return <BlogPostPage params={Promise.resolve({ slug })} />;
    }
  }

  // /company/:domain
  if (cleanPath.startsWith("/company/")) {
    const domain = cleanPath.replace("/company/", "");
    if (domain) {
      return <CompanyHubPage params={Promise.resolve({ domain })} />;
    }
  }

  // /jobs/location/:location
  if (cleanPath.startsWith("/jobs/location/")) {
    const location = cleanPath.replace("/jobs/location/", "");
    if (location) {
      return <JobsLocationPage params={Promise.resolve({ location })} />;
    }
  }

  // /jobs/platform/:platform
  if (cleanPath.startsWith("/jobs/platform/")) {
    const platform = cleanPath.replace("/jobs/platform/", "");
    if (platform) {
      return <JobsPlatformPage params={Promise.resolve({ platform })} />;
    }
  }

  // /jobs/role/:role
  if (cleanPath.startsWith("/jobs/role/")) {
    const role = cleanPath.replace("/jobs/role/", "");
    if (role) {
      return <JobsRolePage params={Promise.resolve({ role })} />;
    }
  }

  return <NotFoundPage />;
}

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Suspense fallback={<PageLoader />}>
          <Router />
        </Suspense>
      </ThemeProvider>
    </React.StrictMode>
  );
}
