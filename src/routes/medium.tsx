import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Stagger, StaggerItem } from "@/components/reveal";
import { getMediumPosts } from "@/lib/medium.functions";

export const Route = createFileRoute("/medium")({
  head: () => ({
    meta: [
      { title: "Medium — Omar Khalid" },
      { name: "description", content: "Latest Medium articles by Omar Khalid, auto-synced from the Medium RSS feed." },
      { property: "og:title", content: "Medium — Omar Khalid" },
      { property: "og:description", content: "Latest Medium articles, auto-synced." },
    ],
  }),
  component: MediumPage,
});

function MediumPage() {
  const fetchFn = useServerFn(getMediumPosts);
  const { data, isLoading } = useQuery({
    queryKey: ["medium-feed"],
    queryFn: () => fetchFn(),
    staleTime: 1000 * 60 * 30,
  });
  const router = useRouter();

  return (
    <div>
      <PageHeader
        kicker="Medium"
        title="Latest articles."
        description="Auto-synced from my Medium RSS feed. New posts appear here automatically."
      />
      <section className="container-prose pb-24">
        {isLoading && (
          <div className="text-sm text-muted-foreground">Loading feed…</div>
        )}

        {!isLoading && data && !data.handle && (
          <div className="terminal-frame rounded-2xl p-8">
            <h3 className="text-lg font-semibold">Medium handle not configured</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Set your Medium handle in <code className="text-mono px-1.5 py-0.5 rounded bg-secondary">src/config/site.ts</code>
              {" "}or as a <code className="text-mono px-1.5 py-0.5 rounded bg-secondary">MEDIUM_HANDLE</code> environment variable to auto-pull posts.
            </p>
          </div>
        )}

        {!isLoading && data?.error && (
          <div className="text-sm text-destructive">Could not load feed: {data.error}</div>
        )}

        {data && data.posts.length > 0 && (
          <Stagger className="grid md:grid-cols-2 gap-4">
            {data.posts.map((p) => (
              <StaggerItem key={p.link}>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="block terminal-frame rounded-2xl p-7 h-full group hover:border-primary/40 hover:-translate-y-0.5 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-primary uppercase tracking-wider">
                      {p.pubDate ? new Date(p.pubDate).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "Medium"}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold tracking-tight group-hover:text-primary transition">{p.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        )}

        <button
          onClick={() => router.invalidate()}
          className="mt-10 text-xs text-muted-foreground hover:text-foreground"
        >
          Refresh feed
        </button>
      </section>
    </div>
  );
}