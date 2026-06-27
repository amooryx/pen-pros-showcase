import { createFileRoute } from "@tanstack/react-router";
import { Flag, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Stagger, StaggerItem } from "@/components/reveal";
import { ctfs } from "@/data/site";

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
  return (
    <div>
      <PageHeader
        kicker="03 / ctf"
        title="Capture the Flag"
        description="Selected CTF writeups — mostly picoCTF — covering forensics, steganography and miscellaneous puzzles. Methodology over speed."
      />
      <section className="container-prose py-16">
        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ctfs.map((c) => (
            <StaggerItem key={c.title}>
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="block terminal-frame rounded-lg p-5 h-full group hover:border-primary/60 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-mono text-xs text-primary">
                    <Flag className="h-3.5 w-3.5" /> {c.event}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
                </div>
                <h2 className="mt-3 text-base font-semibold group-hover:text-primary transition">{c.title}</h2>
                <p className="mt-2 text-mono text-xs text-muted-foreground">{c.category}</p>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}