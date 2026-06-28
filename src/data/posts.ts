export interface Post {
  slug: string;
  title: string;
  description: string;
  category: string;
  sourceUrl: string;
  markdown: string;
}

const modules = import.meta.glob("../content/posts/*.json", {
  eager: true,
}) as Record<string, { default: Post } | Post>;

function unwrap(m: { default: Post } | Post): Post {
  return (m as { default?: Post }).default ?? (m as Post);
}

export const posts: Post[] = Object.entries(modules)
  .filter(([p]) => !p.endsWith("_index.json"))
  .map(([, m]) => unwrap(m))
  .filter((p) => p && p.slug && p.markdown)
  .sort((a, b) => a.title.localeCompare(b.title));

export const postsBySlug: Record<string, Post> = Object.fromEntries(
  posts.map((p) => [p.slug, p]),
);

export const postsByCategory = (cat: string) =>
  posts.filter((p) => p.category === cat);

export const ALL_CATEGORIES = Array.from(
  new Set(posts.map((p) => p.category)),
).sort();

// Map original GitBook URL -> internal slug (for legacy references)
export const slugForUrl: Record<string, string> = Object.fromEntries(
  posts.map((p) => [p.sourceUrl, p.slug]),
);