import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Award, Users, Trophy } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Stagger, StaggerItem, Reveal } from "@/components/reveal";
import { useState } from "react";

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
    images: ["/images/events/aja-ctf.jpeg"],
    icon: Trophy,
    highlight: "1st Place Champions"
  },
  {
    title: "Blackhat CTF Final Round",
    category: "CTF Tournament",
    date: "2024 - 2025",
    description: "Competed in the grueling Blackhat CTF qualifiers with an elite group of teammates, successfully qualifying for the final round. Solved complex binary exploitation, heap manipulation, and cryptographic puzzles against top-tier international teams.",
    images: [
      "/images/events/blackhat-2025.jpeg",
      "/images/events/blackhat-2025-2.jpeg",
      "/images/events/blackhat-2024.png"
    ],
    captions: ["2025 Finalist Team", "2025 Venue Exhibitor", "2024 Qualifier Match"],
    icon: Award,
    highlight: "Finalist Qualified Team"
  },
  {
    title: "LEAP 2025 Conference Showcase",
    category: "Tech Summit",
    date: "March 2025",
    description: "Participated in LEAP 2025 in Riyadh—one of the largest tech conferences in the world. Represented our team, connected with international security experts, explored cutting-edge IBM/Google Cloud security panels, and networked in the regional hackers ecosystem.",
    images: [
      "/images/events/leap-2025-2.jpeg",
      "/images/events/leap-2025-3.jpeg"
    ],
    captions: ["IBM Tech Booth", "Conference Main Hall"],
    icon: Users,
    highlight: "Exhibitor & Player"
  },
  {
    title: "Google Developer Student Clubs (GDSC)",
    category: "Community",
    date: "2024",
    description: "Active contributor and leader within the Google Developer Student Clubs. Focused on fostering local developer communities, holding hands-on security workshops, and teaching students the basics of secure coding, Linux administration, and network analysis.",
    images: ["/images/events/gdsc.jpeg"],
    icon: Calendar,
    highlight: "Tech Lead & Speaker"
  }
];

function EventsPage() {
  const [activeImageIndices, setActiveImageIndices] = useState<Record<number, number>>({});

  const handleSelectImage = (eventIndex: number, imageIndex: number) => {
    setActiveImageIndices((prev) => ({
      ...prev,
      [eventIndex]: imageIndex,
    }));
  };

  return (
    <div>
      <PageHeader
        kicker="Community"
        title="Events & Highlights."
        description="Major cybersecurity events, hackathons, speaker sessions, and tech conferences I've participated in alongside my teams."
      />
      
      <section className="container-prose pb-24">
        <Stagger className="space-y-16">
          {events.map((e, eventIdx) => {
            const Icon = e.icon;
            const activeIdx = activeImageIndices[eventIdx] || 0;
            const featuredImage = e.images[activeIdx];
            const hasMultipleImages = e.images.length > 1;

            return (
              <StaggerItem key={e.title}>
                <div className="border border-border/85 dark:border-border/35 bg-card/60 dark:bg-card/20 backdrop-blur-md rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 grid md:grid-cols-12 gap-0">
                  
                  {/* Event Image Box */}
                  <div className="md:col-span-5 relative h-80 md:h-auto overflow-hidden bg-secondary/10 flex flex-col">
                    <div className="flex-1 relative overflow-hidden">
                      <img
                        src={featuredImage}
                        alt={e.title}
                        className="w-full h-full object-cover transition-all duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md text-xs font-semibold px-3 py-1.5 rounded-full border border-border flex items-center gap-1.5 text-primary">
                        <Icon className="h-3.5 w-3.5" />
                        <span>{e.highlight}</span>
                      </div>
                    </div>

                    {/* Gallery Thumbnails Selector */}
                    {hasMultipleImages && (
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
                        <div className="flex gap-1.5 bg-background/80 dark:bg-background/60 backdrop-blur-md px-3 py-2 rounded-full border border-border">
                          {e.images.map((img, imgIdx) => (
                            <button
                              key={imgIdx}
                              onClick={() => handleSelectImage(eventIdx, imgIdx)}
                              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                                activeIdx === imgIdx
                                  ? "w-6 bg-primary"
                                  : "w-2.5 bg-muted-foreground/35 hover:bg-muted-foreground/60"
                              }`}
                              title={e.captions ? e.captions[imgIdx] : `Photo ${imgIdx + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Event Details Content */}
                  <div className="md:col-span-7 p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <span>{e.category}</span>
                      <span>•</span>
                      <span>{e.date}</span>
                    </div>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight leading-tight">{e.title}</h2>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{e.description}</p>
                    
                    {hasMultipleImages && e.captions && (
                      <div className="mt-5 text-xs text-primary font-medium uppercase tracking-wider">
                        Viewing: <span className="text-foreground">{e.captions[activeIdx]}</span>
                      </div>
                    )}
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
