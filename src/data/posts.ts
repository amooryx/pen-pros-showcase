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

const PRIORITIES: Record<string, number> = {
  "certs-oscpplus-oscp": 100,
  "bug-bounty-prototype-pollution-chartjs": 94,
  "bug-bounty-unrestricted-file-upload-cdn": 93,
  "bug-bounty-auth-bypass-ropc": 92,
  "bug-bounty-blind-ssrf-xmlrpc": 91,
  "bug-bounty-rate-limit-login-bruteforce": 90,
  "bug-bounty-session-expiration-logout-failure": 89,
  "certs-crtp": 88,
  "certs-ewptx": 80,
  "certs-ecpptv3": 70,
  "certs-ecir": 60,
  "certs-ecdfp": 50,
  "certs-ejptv2": 30,
  "certs-securityplus": 20,
  "certs-harvard-cs50-cybersecurity": 10,
};

export const posts: Post[] = Object.entries(modules)
  .filter(([p]) => !p.endsWith("_index.json"))
  .map(([, m]) => unwrap(m))
  .filter((p) => p && p.slug && p.markdown)
  .sort((a, b) => {
    const prioA = PRIORITIES[a.slug] || 0;
    const prioB = PRIORITIES[b.slug] || 0;
    if (prioA !== prioB) {
      return prioB - prioA;
    }
    return a.title.localeCompare(b.title);
  });

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