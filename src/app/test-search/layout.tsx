import type { Metadata } from 'next';

// Ensure this internal test page is never indexed by search engines
export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
    title: 'Test Search | Internal',
};

export default function TestSearchLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
