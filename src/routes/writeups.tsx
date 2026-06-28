import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Stagger, StaggerItem } from "@/components/reveal";
import { posts, ALL_CATEGORIES } from "@/data/posts";
import { useState } from "react";

export const Route = createFileRoute("/writeups")({
  head: () => ({
    meta: [
      { title: "Writeups — Omar Khalid" },
      { name: "description", content: "Every lab, CTF, certification review, malware analysis and DFIR writeup by Omar Khalid — fully published on-site." },
      { property: "og:title", content: "Writeups — Omar Khalid" },
      { property: "og:description", content: "Complete archive of pentesting, red team, DFIR and CTF writeups." },
    ],
  }),
  component: WriteupsPage,
});

function WriteupsPage() {
  const [active, setActive] = useState<string>("All");
  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      <PageHeader
        kicker="Archive"
        title="Writeups."
        description="Every lab, CTF, malware reverse, DFIR scenario and certification review — fully written here, no need to leave the site."
      />
      <section className="container-prose pb-24">
        <div className="flex flex-wrap gap-2 mb-10 border-b border-border pb-6">
          {["All", ...ALL_CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`text-sm px-4 py-1.5 rounded-full transition ${
                active === c
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <Stagger className="grid md:grid-cols-2 gap-4">
          {filtered.map((p) => (
            <StaggerItem key={p.slug}>
              <Link
                to="/writeups/$slug"
                params={{ slug: p.slug }}
                className="block terminal-frame rounded-2xl p-7 h-full group hover:border-primary/40 hover:-translate-y-0.5 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">{p.category}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
                </div>
                <h2 className="mt-4 text-xl font-semibold tracking-tight group-hover:text-primary transition">{p.title}</h2>
                {p.description && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                )}
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}