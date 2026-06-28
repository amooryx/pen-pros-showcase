import { createFileRoute } from "@tanstack/react-router";
import { Mail, Github, Linkedin, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Stagger, StaggerItem } from "@/components/reveal";
import { siteConfig } from "@/config/site";

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

function ContactPage() {
  const channels = [
    { 
      icon: Mail, 
      label: "Email", 
      value: "khalideldemery@gmail.com", 
      href: siteConfig.socials.email, 
      note: "Best for engagements and professional inquiries." 
    },
    { 
      icon: Linkedin, 
      label: "LinkedIn", 
      value: "Omar Khalid", 
      href: siteConfig.socials.linkedin, 
      note: "Professional network & direct messaging." 
    },
    { 
      icon: Github, 
      label: "GitHub", 
      value: "amooryx", 
      href: siteConfig.socials.github, 
      note: "Vulnerability PoCs, tooling, and repositories." 
    },
    { 
      icon: MessageSquare, 
      label: "Discord", 
      value: siteConfig.socials.discord, 
      href: `https://discord.com/users/${siteConfig.socials.discord}`, 
      note: "Real-time communication & networking." 
    },
  ];

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
                className="block border border-border/85 dark:border-border/35 bg-card/60 dark:bg-card/20 backdrop-blur-md rounded-2xl p-7 h-full group hover:border-primary/50 dark:hover:border-primary/40 hover:-translate-y-1 transition duration-300 shadow-sm hover:shadow-md hover:shadow-primary/5 dark:hover:shadow-primary/5"
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