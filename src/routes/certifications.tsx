import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Stagger, StaggerItem } from "@/components/reveal";
import { postsByCategory } from "@/data/posts";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: "Certifications — Omar Khalid" },
      { name: "description", content: "OSCP+, OSCP, CRTP, eWPTX, eCPPTv3, eCIR, eCDFP, eJPTv2, Security+, Harvard CS50 — full reviews and the skills behind each one." },
      { property: "og:title", content: "Certifications — Omar Khalid" },
      { property: "og:description", content: "Industry certifications across offensive security, red team and DFIR." },
    ],
  }),
  component: CertificationsPage,
});

function CertificationsPage() {
  const certs = postsByCategory("Certification");
  return (
    <div>
      <PageHeader
        kicker="Credentials"
        title="Certifications."
        description="Every certification I've earned, with the full review I wrote about it. Click any card to read the deep dive."
      />
      <section className="container-prose pb-24">
        <Stagger className="grid md:grid-cols-2 gap-4">
          {certs.map((c) => (
            <StaggerItem key={c.slug}>
              <Link
                to="/writeups/$slug"
                params={{ slug: c.slug }}
                className="block terminal-frame rounded-2xl p-7 h-full group hover:border-primary/40 hover:-translate-y-0.5 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition" />
                </div>
                <h2 className="mt-4 text-xl font-semibold tracking-tight group-hover:text-primary transition">{c.title}</h2>
                {c.description && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{c.description}</p>
                )}
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}