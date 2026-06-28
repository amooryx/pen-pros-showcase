import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Stagger, StaggerItem } from "@/components/reveal";
import { posts } from "@/data/posts";

export const Route = createFileRoute("/labs")({
  head: () => ({
    meta: [
      { title: "Labs & Writeups — Omar Khalid" },
      { name: "description", content: "Mobile pentesting (Frida), reverse engineering, malware analysis, memory forensics and incident response lab writeups." },
      { property: "og:title", content: "Labs & Writeups — Omar Khalid" },
      { property: "og:description", content: "Hands-on lab writeups across mobile, web, RE, malware and DFIR." },
    ],
  }),
  component: LabsPage,
});

const LAB_CATEGORIES = ["Mobile", "Reverse Engineering", "Malware", "DFIR", "Memory"];

function LabsPage() {
  const [active, setActive] = useState<string>("All");
  const labPosts = posts.filter((p) => LAB_CATEGORIES.includes(p.category));
  const filtered = active === "All" ? labPosts : labPosts.filter((p) => p.category === active);

  return (
    <div>
      <PageHeader
        kicker="Labs"
        title="Hands-on labs."
        description="Long-form walkthroughs from mobile pentesting with Frida, reverse engineering, malware analysis and DFIR scenarios — fully published on-site."
      />
      <section className="container-prose pb-24">
        <div className="flex flex-wrap gap-2 mb-10 border-b border-border pb-6">
          {["All", ...LAB_CATEGORIES].map((c) => (
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
        <Stagger key={active} className="grid md:grid-cols-2 gap-4">
          {filtered.map((l) => (
            <StaggerItem key={l.slug}>
              <Link
                to="/writeups/$slug"
                params={{ slug: l.slug }}
                className="block border border-border/85 dark:border-border/35 bg-card/60 dark:bg-card/20 backdrop-blur-md rounded-2xl p-7 h-full group hover:border-primary/50 dark:hover:border-primary/40 hover:-translate-y-1 transition duration-300 shadow-sm hover:shadow-md hover:shadow-primary/5 dark:hover:shadow-primary/5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">{l.category}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
                </div>
                <h2 className="mt-4 text-xl font-semibold tracking-tight group-hover:text-primary transition">{l.title}</h2>
                {l.description && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{l.description}</p>
                )}
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}