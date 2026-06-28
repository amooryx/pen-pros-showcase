import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Markdown } from "@/components/markdown";
import { postsBySlug } from "@/data/posts";

export const Route = createFileRoute("/writeups_/$slug")({
  loader: ({ params }) => {
    const post = postsBySlug[params.slug];
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Omar Khalid` },
          { name: "description", content: loaderData.description || loaderData.title },
          { property: "og:title", content: `${loaderData.title} — Omar Khalid` },
          { property: "og:description", content: loaderData.description || loaderData.title },
          { property: "article:author", content: "Omar Khalid" },
        ]
      : [],
  }),
  component: WriteupPage,
  notFoundComponent: () => (
    <div className="container-prose py-32 text-center">
      <h1 className="text-3xl font-semibold">Writeup not found</h1>
      <Link to="/writeups" className="mt-4 inline-block text-primary">Back to all writeups</Link>
    </div>
  ),
});

function WriteupPage() {
  const post = Route.useLoaderData();
  return (
    <article>
      <div className="container-prose pt-12 md:pt-16">
        <Link to="/writeups" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition">
          <ArrowLeft className="h-4 w-4" /> All writeups
        </Link>
      </div>
      <header className="container-prose pt-8 pb-10 max-w-3xl">
        <Reveal>
          <div className="text-xs font-medium text-primary uppercase tracking-[0.18em]">{post.category}</div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight leading-tight">{post.title}</h1>
        </Reveal>
        {post.description && (
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{post.description}</p>
          </Reveal>
        )}
      </header>
      <div className="border-t border-border">
        <div className="container-prose py-12 max-w-3xl">
          <Reveal>
            <Markdown>{post.markdown}</Markdown>
          </Reveal>
          <div className="mt-16 pt-8 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
            <Link to="/writeups" className="hover:text-foreground">← More writeups</Link>
            {post.category === "Certification" && (
              <a href="https://www.credential.net/profile/omarkhalidalimohamedahmed701437/wallet" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-primary transition font-medium text-primary">
                 Verify Credential <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
