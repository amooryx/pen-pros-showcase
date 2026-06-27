import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Stagger, StaggerItem } from "@/components/reveal";
import { certifications } from "@/data/site";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: "Certifications — Omar Khalid" },
      { name: "description", content: "OSCP+, OSCP, CRTP, eWPTX, eCPPTv3, eCIR, eCDFP, eJPTv2, Security+, Harvard CS50 — certifications earned and the skills behind them." },
      { property: "og:title", content: "Certifications — Omar Khalid" },
      { property: "og:description", content: "Industry certifications across offensive security, red team and DFIR." },
    ],
  }),
  component: CertificationsPage,
});

function CertificationsPage() {
  return (
    <div>
      <PageHeader
        kicker="01 / certifications"
        title="Certifications & reviews"
        description="A collection of certifications I've earned across offensive security, red team operations and digital forensics — and the hands-on skills each one taught."
      />
      <section className="container-prose py-16">
        <Stagger className="grid md:grid-cols-2 gap-4">
          {certifications.map((c) => (
            <StaggerItem key={c.code}>
              <article className="terminal-frame rounded-lg p-6 h-full hover:border-primary/60 transition">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-mono text-xs text-primary">{c.code}</span>
                  <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                </div>
                <h2 className="mt-3 text-xl font-semibold">{c.name}</h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <li key={t} className="text-mono text-[11px] px-2 py-0.5 rounded border border-border text-muted-foreground">
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </div>
  );
}