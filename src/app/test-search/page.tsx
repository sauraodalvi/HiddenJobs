'use client';

import { useState } from 'react';
import { proxySearch } from '@/app/actions/test-proxy';

const PUBLIC_INSTANCES = [
    'https://searx.work',
    'https://searx.hostux.net',
    'https://paulgo.io',
    'https://priv.au',
    'https://northboot.xyz',
    'https://searx.be',
    'DuckDuckGo Lite (HTML)',
    'Mojeek (HTML Scrape)',
];

export default function TestSearchPage() {
    const [query, setQuery] = useState('site:boards.greenhouse.io ("Product Manager" OR "PM" OR "Product Lead" ("remote" OR "work from home" OR "wfh" OR "anywhere")) after:2026-03-22');
    const [results, setResults] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [instance, setInstance] = useState(PUBLIC_INSTANCES[0]);
    const [error, setError] = useState<string | null>(null);

    const runTest = async () => {
        setLoading(true);
        setError(null);
        try {
            let type: 'json' | 'ddg-lite' | 'mojeek' = 'json';
            let searchUrl = `${instance}/search?q=${encodeURIComponent(query)}&format=json`;

            if (instance === 'DuckDuckGo Lite (HTML)') {
                type = 'ddg-lite';
                searchUrl = `https://duckduckgo.com/lite/?q=${encodeURIComponent(query)}`;
            } else if (instance === 'Mojeek (HTML Scrape)') {
                type = 'mojeek';
                searchUrl = `https://www.mojeek.com/search?q=${encodeURIComponent(query)}`;
            }

            console.log('Proxying:', searchUrl, 'Type:', type);

            const data = await proxySearch(searchUrl, type);

            if (data.error) {
                setError(data.error);
                setResults(null);
            } else {
                setResults(data);
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
            console.error('Test failed:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto dark:bg-slate-900 min-h-screen text-slate-100">
            <h1 className="text-3xl font-bold mb-6">Discovery Engine Test Pad</h1>

            <div className="space-y-4 mb-8 bg-slate-800 p-6 rounded-xl border border-slate-700">
                <div>
                    <label className="block text-sm font-medium mb-1">Target Instance</label>
                    <select
                        value={instance}
                        onChange={(e) => setInstance(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm"
                    >
                        {PUBLIC_INSTANCES.map(url => (
                            <option key={url} value={url}>{url}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Search Query</label>
                    <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        rows={3}
                        className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm font-mono"
                    />
                </div>

                <button
                    onClick={runTest}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                    {loading ? 'Searching...' : 'Run Discovery Test'}
                </button>
            </div>

            {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
                    <strong>Error:</strong> {error}
                    <p className="text-sm mt-2">Many public instances are currently blocking automated requests. We've attempted multiple fallbacks, including DuckDuckGo Lite. Try a different query or check back later.</p>
                </div>
            )}

            {results && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Results ({results.results?.length || 0})</h2>
                        <span className="text-xs text-slate-400">Time: {results.timing?.total?.toFixed(2)}s</span>
                    </div>

                    <div className="grid gap-4">
                        {results.results?.map((res: any, i: number) => (
                            <div key={i} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors">
                                <a href={res.url} target="_blank" className="text-blue-400 font-medium hover:underline block mb-1">
                                    {res.title}
                                </a>
                                <p className="text-sm text-slate-300 line-clamp-2 mb-2">{res.content}</p>
                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                    <span className="bg-slate-900 px-2 py-1 rounded">{res.engine}</span>
                                    <span className="truncate max-w-[300px]">{res.url}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8">
                        <h3 className="text-sm font-medium text-slate-500 mb-2">Raw JSON Response</h3>
                        <pre className="text-[10px] bg-black p-4 rounded overflow-auto max-h-[300px] text-green-400 font-mono">
                            {JSON.stringify(results, null, 2)}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
}
