import { Reveal } from "./reveal";

export function PageHeader({ kicker, title, description }: { kicker: string; title: string; description?: string }) {
  return (
    <section className="relative">
      <div className="container-prose relative pt-20 md:pt-28 pb-10">
        <Reveal>
          <div className="text-xs font-medium text-primary uppercase tracking-[0.18em]">{kicker}</div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.02]">{title}</h1>
        </Reveal>
        {description && (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">{description}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}