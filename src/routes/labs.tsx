import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Stagger, StaggerItem } from "@/components/reveal";
import { labs } from "@/data/site";

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

const categories = ["All", "Mobile", "Reverse Engineering", "Malware", "DFIR", "Memory"] as const;

function LabsPage() {
  return (
    <div>
      <PageHeader
        kicker="02 / labs"
        title="Labs & writeups"
        description="Long-form walkthroughs from mobile pentesting with Frida, reverse engineering, malware analysis and DFIR scenarios."
      />
      <section className="container-prose py-16">
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((c) => (
            <span key={c} className="text-mono text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground">
              {c}
            </span>
          ))}
        </div>
        <Stagger className="grid md:grid-cols-2 gap-4">
          {labs.map((l) => (
            <StaggerItem key={l.title}>
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="block terminal-frame rounded-lg p-6 h-full group hover:border-primary/60 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-mono text-xs text-primary">{l.category}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
                </div>
                <h2 className="mt-3 text-lg font-semibold group-hover:text-primary transition">{l.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{l.description}</p>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}