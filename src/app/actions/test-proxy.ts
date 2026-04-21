'use server';

const FALLBACK_INSTANCES = [
    'https://searx.work',
    'https://searx.hostux.net',
    'https://paulgo.io',
    'https://priv.au',
    'https://northboot.xyz',
    'https://searx.be',
    'https://searx.net.ph',
    'https://searx.si',
    'https://searx.fmac.xyz'
];

const USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0'
];

function getRandomUserAgent() {
    return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

function shuffleArray<T>(array: T[]): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

export async function proxySearch(url: string, type: 'json' | 'ddg-lite' | 'mojeek' = 'json', isFallback = false): Promise<any> {
    const urlObj = new URL(url);
    const query = urlObj.searchParams.get('q') || '';

    const attemptFallback = async () => {
        if (isFallback) return null; // Don't recurse infinitely

        console.log(`Attempting fallbacks for query: ${query}`);
        // Shuffle fallbacks to avoid hotspots
        const shuffledFallbacks = shuffleArray(FALLBACK_INSTANCES);

        for (const nextInstance of shuffledFallbacks) {
            if (nextInstance.includes(urlObj.host)) continue;
            const nextUrl = `${nextInstance}/search?q=${encodeURIComponent(query)}&format=json`;
            try {
                const res = await proxySearch(nextUrl, 'json', true);
                if (res && !res.error && res.results?.length > 0) {
                    console.log(`Fallback to ${nextInstance} succeeded.`);
                    return res;
                }
            } catch (e) { }
        }

        // FINAL FALLBACK: DuckDuckGo Lite
        console.log('All SearxNG fallbacks failed/empty. Trying DuckDuckGo Lite...');
        // Strip Google-specific operators that might break other engines
        const ddgQuery = query.replace(/after:\S+/g, '').replace(/before:\S+/g, '').trim();
        const ddgUrl = `https://duckduckgo.com/lite/?q=${encodeURIComponent(ddgQuery)}`;
        return await proxySearch(ddgUrl, 'ddg-lite', true);
    };

    try {
        const headers: Record<string, string> = {
            'User-Agent': getRandomUserAgent(),
            'Accept': type === 'json' ? 'application/json' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Sec-Ch-Ua': '"Chromium";v="123", "Not:A-Brand";v="8"',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'Referer': `${urlObj.protocol}//${urlObj.host}/`
        };

        const response = await fetch(url, {
            headers,
            next: { revalidate: 0 },
            signal: AbortSignal.timeout(12000) // 12s timeout
        });

        if (!response.ok) {
            const text = await response.text();
            const errorMsg = `Connection Failed (${response.status}): ${text.slice(0, 150).replace(/<[^>]*>/g, '').trim() || response.statusText}`;

            if (!isFallback && type === 'json' && (response.status === 403 || response.status === 429 || response.status === 503)) {
                const fallbackResult = await attemptFallback();
                if (fallbackResult) return fallbackResult;
            }

            return { error: errorMsg, status: response.status };
        }

        const html = await response.text();

        if (type === 'ddg-lite') {
            const results = [];
            const titles = html.match(/<a[^>]*class=['"]result-link['"][^>]*>([\s\S]*?)<\/a>/g) || [];
            const snippets = html.match(/<td[^>]*class=['"]result-snippet['"][^>]*>([\s\S]*?)<\/td>/g) || [];

            for (let i = 0; i < titles.length; i++) {
                const urlMatch = titles[i].match(/href=['"]([^'"]+)['"]/);
                const titleText = titles[i].replace(/<[^>]*>/g, '').trim();
                const snippetText = snippets[i] ? snippets[i].replace(/<[^>]*>/g, '').trim() : '';

                if (urlMatch) {
                    let finalUrl = urlMatch[1];
                    if (finalUrl.includes('uddg=')) {
                        const parts = finalUrl.split('uddg=');
                        if (parts[1]) {
                            finalUrl = decodeURIComponent(parts[1].split('&')[0]);
                        }
                    }
                    if (finalUrl.startsWith('//')) finalUrl = 'https:' + finalUrl;

                    if (titleText && !finalUrl.includes('duckduckgo.com/')) {
                        results.push({
                            url: finalUrl,
                            title: titleText,
                            content: snippetText,
                            engine: 'duckduckgo-lite'
                        });
                    }
                }
            }
            return { results };
        }

        if (type === 'mojeek') {
            const results = [];
            const titles = html.match(/<a class="ob" href="([^"]+)">([^<]+)<\/a>/g) || [];
            const snippets = html.match(/<p class="s">([^<]+)<\/p>/g) || [];

            for (let i = 0; i < titles.length; i++) {
                const urlMatch = titles[i].match(/href="([^"]+)"/);
                const titleMatch = titles[i].match(/>([^<]+)</);
                const snippetMatch = snippets[i]?.match(/>([^<]+)</);

                if (urlMatch && titleMatch) {
                    results.push({
                        url: urlMatch[1],
                        title: titleMatch[1].trim(),
                        content: snippetMatch ? snippetMatch[1].trim() : '',
                        engine: 'mojeek'
                    });
                }
            }
            return { results };
        }

        try {
            const data = JSON.parse(html);
            if (!isFallback && (!data.results || data.results.length === 0)) {
                // If it was a complex query with after:, try once without it before doing full fallback
                if (query.includes('after:')) {
                    const simplerQuery = query.replace(/after:\S+/g, '').trim();
                    const simplerUrl = `${urlObj.origin}${urlObj.pathname}?q=${encodeURIComponent(simplerQuery)}&format=json`;
                    console.log(`No results with after:. Retrying simpler query: ${simplerQuery}`);
                    return await proxySearch(simplerUrl, 'json', true);
                }

                console.log(`No results from ${urlObj.host}. Trying fallbacks...`);
                const fallbackResult = await attemptFallback();
                if (fallbackResult) return fallbackResult;
            }
            return data;
        } catch (e) {
            console.log(`Malformed JSON from ${urlObj.host}. Trying fallbacks...`);
            const fallbackResult = await attemptFallback();
            if (fallbackResult) return fallbackResult;
            return { error: 'Failed to parse response from search instance.' };
        }
    } catch (error: any) {
        console.error('Proxy Error:', error);
        if (!isFallback) {
            const fallbackResult = await attemptFallback();
            if (fallbackResult) return fallbackResult;
        }
        return { error: error.name === 'TimeoutError' ? 'Request timed out' : error.message };
    }
}
