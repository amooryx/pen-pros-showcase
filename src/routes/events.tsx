import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Award, Users, Trophy } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Stagger, StaggerItem, Reveal } from "@/components/reveal";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events & Achievements — Omar Khalid" },
      { name: "description", content: "Highlights of my participation in major tech conferences, developer clubs, and CTF championships including Blackhat, LEAP 2025, GDSC, and AJA CTF." },
      { property: "og:title", content: "Events & Achievements — Omar Khalid" },
      { property: "og:description", content: "Participation in major security tournaments, tech summits and communities." },
    ],
  }),
  component: EventsPage,
});

const events = [
  {
    title: "1st Place — AJA CTF Competition",
    category: "Championship",
    date: "2025",
    description: "Led our core team to achieve the absolute 1st place in the AJA Capture The Flag competition. Solved high-difficulty challenges across steganography, memory forensics, reverse engineering, and web vulnerability analysis under intense competitive pressure.",
    image: "/images/events/aja-ctf.jpeg",
    icon: Trophy,
    highlight: "1st Place Champions"
  },
  {
    title: "Blackhat CTF Qualifiers Finalist",
    category: "CTF Tournament",
    date: "2024 - 2025",
    description: "Competed in the grueling Blackhat CTF qualifiers with an elite group of teammates, successfully qualifying for the final round. Solved complex binary exploitation, heap manipulation, and cryptographic puzzles against top-tier international teams.",
    image: "/images/events/blackhat-2025.jpeg",
    icon: Award,
    highlight: "Finalist Qualified Team"
  },
  {
    title: "LEAP 2025 Conference Showcase",
    category: "Tech Summit",
    date: "March 2025",
    description: "Participated in LEAP 2025 in Riyadh—one of the largest tech conferences in the world. Represented our team, connected with international security experts, explored cutting-edge Mandiant/Google Cloud security panels, and networked in the regional hackers ecosystem.",
    image: "/images/events/leap-2025.jpeg",
    icon: Users,
    highlight: "Exhibitor & Player"
  },
  {
    title: "Google Developer Student Clubs (GDSC)",
    category: "Community",
    date: "2024",
    description: "Active contributor and leader within the Google Developer Student Clubs. Focused on fostering local developer communities, holding hands-on security workshops, and teaching students the basics of secure coding, Linux administration, and network analysis.",
    image: "/images/events/gdsc.jpeg",
    icon: Calendar,
    highlight: "Tech Lead & Speaker"
  }
];

function EventsPage() {
  return (
    <div>
      <PageHeader
        kicker="Community"
        title="Events & Highlights."
        description="Major cybersecurity events, hackathons, speaker sessions, and tech conferences I've participated in alongside my teams."
      />
      
      <section className="container-prose pb-24">
        <Stagger className="space-y-16">
          {events.map((e, index) => {
            const Icon = e.icon;
            return (
              <StaggerItem key={e.title}>
                <div className="border border-border/85 dark:border-border/35 bg-card/60 dark:bg-card/20 backdrop-blur-md rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 grid md:grid-cols-12 gap-0">
                  <div className="md:col-span-5 relative h-72 md:h-auto overflow-hidden bg-secondary/10">
                    <img
                      src={e.image}
                      alt={e.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md text-xs font-semibold px-3 py-1.5 rounded-full border border-border flex items-center gap-1.5 text-primary">
                      <Icon className="h-3.5 w-3.5" />
                      <span>{e.highlight}</span>
                    </div>
                  </div>
                  
                  <div className="md:col-span-7 p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <span>{e.category}</span>
                      <span>•</span>
                      <span>{e.date}</span>
                    </div>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight leading-tight">{e.title}</h2>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{e.description}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>
    </div>
  );
}
