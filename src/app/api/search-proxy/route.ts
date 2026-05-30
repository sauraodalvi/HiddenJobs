import { proxySearch } from "@/app/actions/test-proxy";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const engine = searchParams.get("engine") || "searx";

  if (!q) {
    return Response.json({ error: "Missing ?q= parameter" }, { status: 400 });
  }

  const instance = "https://searx.work";

  try {
    let data;

    if (engine === "ddg") {
      const ddgQuery = q.replace(/after:\S+/g, "").replace(/before:\S+/g, "").trim();
      data = await proxySearch(
        `https://duckduckgo.com/lite/?q=${encodeURIComponent(ddgQuery)}`,
        "ddg-lite"
      );
    } else if (engine === "mojeek") {
      const mQuery = q.replace(/after:\S+/g, "").replace(/before:\S+/g, "").trim();
      data = await proxySearch(
        `https://www.mojeek.com/search?q=${encodeURIComponent(mQuery)}`,
        "mojeek"
      );
    } else {
      data = await proxySearch(
        `${instance}/search?q=${encodeURIComponent(q)}&format=json`,
        "json"
      );
    }

    return Response.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=120, stale-while-revalidate=60",
      },
    });
  } catch {
    return Response.json({ error: "Search failed" }, { status: 502 });
  }
}
