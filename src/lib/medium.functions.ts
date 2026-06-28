import { createServerFn } from "@tanstack/react-start";
import { XMLParser } from "fast-xml-parser";
import { siteConfig } from "@/config/site";

export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  categories: string[];
}

function stripHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

export const getMediumPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ handle: string; posts: MediumPost[]; error?: string }> => {
    const handle = (process.env.MEDIUM_HANDLE || siteConfig.mediumHandle || "")
      .replace(/^@/, "")
      .trim();
    if (!handle) return { handle: "", posts: [] };

    const url = `https://medium.com/feed/@${handle}`;
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (portfolio-medium-feed)" },
      });
      if (!res.ok) {
        return { handle, posts: [], error: `Medium responded ${res.status}` };
      }
      const xml = await res.text();
      const parser = new XMLParser({ ignoreAttributes: false });
      const data = parser.parse(xml);
      const itemsRaw = data?.rss?.channel?.item ?? [];
      const items = Array.isArray(itemsRaw) ? itemsRaw : [itemsRaw];
      const posts: MediumPost[] = items.map((it: Record<string, unknown>) => {
        const html = String(
          (it["content:encoded"] as string) || (it.description as string) || "",
        );
        const text = stripHtml(html);
        const cats = it.category;
        return {
          title: String(it.title || "Untitled"),
          link: String(it.link || "#"),
          pubDate: String(it.pubDate || ""),
          excerpt: text.slice(0, 220) + (text.length > 220 ? "…" : ""),
          categories: Array.isArray(cats) ? cats.map(String) : cats ? [String(cats)] : [],
        };
      });
      return { handle, posts };
    } catch (e) {
      return { handle, posts: [], error: (e as Error).message };
    }
  },
);