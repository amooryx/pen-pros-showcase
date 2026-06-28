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
  { icon: BookOpen, label: "Medium", value: "medium.com/@omar-khalid", href: "https://medium.com/", note: "Long-form articles and writeups." },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/omar-khalid", href: "https://www.linkedin.com/", note: "Professional network." },
  { icon: Github, label: "GitHub", value: "github.com/omar-khalid", href: "https://github.com/", note: "Tools, scripts and PoCs." },
];

function ContactPage() {
  return (
    <div>
      <PageHeader
        kicker="Contact"
        title="Let's talk."
        description="Open to penetration testing engagements, red team exercises, DFIR work and vulnerability disclosure. Pick whichever channel suits you."
      />
      <section className="container-prose pb-24">
        <Stagger className="grid md:grid-cols-2 gap-4">
          {channels.map(({ icon: Icon, ...c }) => (
            <StaggerItem key={c.label}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="block terminal-frame rounded-2xl p-7 h-full group hover:border-primary/40 hover:-translate-y-0.5 transition"
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-secondary text-foreground">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <div className="text-xs font-medium text-primary uppercase tracking-wider">{c.label}</div>
                    <div className="text-foreground font-medium group-hover:text-primary transition">{c.value}</div>
                  </div>
                </div>
                <p className="mt-5 text-sm text-muted-foreground">{c.note}</p>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}