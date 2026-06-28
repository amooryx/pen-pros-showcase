import { createFileRoute, Link } from "@tanstack/react-router";
import { Flag, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Stagger, StaggerItem } from "@/components/reveal";
import { postsByCategory } from "@/data/posts";

export const Route = createFileRoute("/ctf")({
  head: () => ({
    meta: [
      { title: "CTF Writeups — Omar Khalid" },
      { name: "description", content: "PicoCTF and other CTF challenge writeups across forensics, steganography and miscellaneous categories." },
      { property: "og:title", content: "CTF Writeups — Omar Khalid" },
      { property: "og:description", content: "Capture The Flag challenge writeups." },
    ],
  }),
  component: CtfPage,
});

function CtfPage() {
  const ctfs = postsByCategory("CTF");
  return (
    <div>
      <PageHeader
        kicker="CTF"
        title="Capture the Flag."
        description="Selected CTF writeups — mostly picoCTF — covering forensics, steganography and miscellaneous puzzles. Methodology over speed."
      />
      <section className="container-prose pb-24">
        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ctfs.map((c) => (
            <StaggerItem key={c.slug}>
              <Link
                to="/writeups/$slug"
                params={{ slug: c.slug }}
                className="block border border-border/85 dark:border-border/35 bg-card/60 dark:bg-card/20 backdrop-blur-md rounded-2xl p-7 h-full group hover:border-primary/50 dark:hover:border-primary/40 hover:-translate-y-1 transition duration-300 shadow-sm hover:shadow-md hover:shadow-primary/5 dark:hover:shadow-primary/5"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary uppercase tracking-wider">
                    <Flag className="h-3.5 w-3.5" /> CTF
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
                </div>
                <h2 className="mt-4 text-lg font-semibold tracking-tight leading-snug group-hover:text-primary transition">{c.title}</h2>
                {c.description && <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{c.description}</p>}
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}