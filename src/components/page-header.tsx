import { Reveal } from "./reveal";

export function PageHeader({ kicker, title, description }: { kicker: string; title: string; description?: string }) {
  return (
    <section className="relative border-b border-border/60">
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
      <div className="container-prose relative py-20 md:py-28">
        <Reveal>
          <div className="text-mono text-xs text-primary">// {kicker}</div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight">{title}</h1>
        </Reveal>
        {description && (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">{description}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}