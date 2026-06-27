import { createFileRoute } from "@tanstack/react-router";
import { Mail, BookOpen, Github, Linkedin } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Stagger, StaggerItem } from "@/components/reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Omar Khalid" },
      { name: "description", content: "Get in touch with Omar Khalid — penetration testing engagements, red team work, DFIR collaboration and vulnerability disclosure." },
      { property: "og:title", content: "Contact — Omar Khalid" },
      { property: "og:description", content: "Get in touch for engagements, collaborations or disclosure." },
    ],
  }),
  component: ContactPage,
});

const channels = [
  { icon: Mail, label: "Email", value: "omar@example.com", href: "mailto:omar@example.com", note: "Best for engagements and disclosure." },
  { icon: BookOpen, label: "GitBook archive", value: "omar-4.gitbook.io/omar-khalid", href: "https://omar-4.gitbook.io/omar-khalid", note: "Long-form writeups and notes." },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/omar-khalid", href: "https://www.linkedin.com/", note: "Professional network." },
  { icon: Github, label: "GitHub", value: "github.com/omar-khalid", href: "https://github.com/", note: "Tools, scripts and PoCs." },
];

function ContactPage() {
  return (
    <div>
      <PageHeader
        kicker="05 / contact"
        title="Let's talk."
        description="Open to penetration testing engagements, red team exercises, DFIR work and vulnerability disclosure. Pick whichever channel suits you."
      />
      <section className="container-prose py-16">
        <Stagger className="grid md:grid-cols-2 gap-4">
          {channels.map(({ icon: Icon, ...c }) => (
            <StaggerItem key={c.label}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="block terminal-frame rounded-lg p-6 h-full group hover:border-primary/60 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-md border border-primary/30 bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-mono text-xs text-primary">{c.label}</div>
                    <div className="text-foreground font-medium group-hover:text-primary transition">{c.value}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{c.note}</p>
              </a>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mt-12 text-mono text-xs text-muted-foreground">
          // tip: replace the contact values in <span className="text-primary">src/routes/contact.tsx</span> with your real handles.
        </p>
      </section>
    </div>
  );
}