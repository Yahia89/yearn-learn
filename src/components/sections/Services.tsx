"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChalkboardTeacher,
  Student,
  BookBookmark,
  VideoCamera,
  CheckCircle,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const topics = [
  "English",
  "Mathematics",
  "Grammar",
  "Algebra",
  "Reading",
  "Writing",
  "K-6",
  "Zoom",
  "Layann",
  "Education",
  "Mastery",
  "Tutoring",
  "Phonics",
  "Geometry",
  "Literature",
  "Fluency",
  "Comprehension",
];

// Move data generation outside to avoid linter warnings and unnecessary re-renders
const backgroundChipsData = Array.from({ length: 40 }).map((_, i) => ({
  id: i,
  topic: topics[i % topics.length],
  badge: Math.floor(((i + 1) * 7.5) % 99) + 1, // Deterministic "random" for SSR consistency
  rotate: ((i * 11) % 10) - 5, // Subtle rotation
}));

const markerColors = [
  "rgba(255, 159, 28, 0.6)", // Primary
  "rgba(46, 196, 182, 0.6)", // Secondary
  "rgba(255, 191, 105, 0.6)", // Accent
  "rgba(255, 209, 102, 0.6)", // Soft Yellow
];

const StickerHighlight = ({
  text,
  highlightWords,
}: {
  text: string;
  highlightWords: string[];
}) => {
  const parts = text.split(new RegExp(`(${highlightWords.join("|")})`, "gi"));

  return (
    <>
      {parts.map((part, i) => {
        const isHighlighted = highlightWords.some(
          (hw) => hw.toLowerCase() === part.toLowerCase(),
        );
        if (isHighlighted) {
          // Use a deterministic index based on the word itself to keep color consistent
          const colorIndex =
            part.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
            markerColors.length;
          const color = markerColors[colorIndex];

          return (
            <span key={i} className="relative inline-block px-1 mx-0.5 z-0">
              {/* The "Main" Highlight Stroke */}
              <span
                className="absolute inset-0 -rotate-1 rounded-sm -z-10 scale-110"
                style={{
                  clipPath: "polygon(1% 18%, 98% 5%, 96% 92%, 2% 95%)",
                  background: `linear-gradient(105deg, ${color} 0%, ${color.replace("0.45", "0.3")} 60%, ${color.replace("0.45", "0.1")} 100%)`,
                }}
              />
              {/* The "Dry Ink" Texture Effect */}
              <span
                className="absolute inset-0 -rotate-1 rounded-sm -z-10 scale-110 opacity-60"
                style={{
                  clipPath: "polygon(3% 10%, 95% 12%, 99% 90%, 5% 88%)",
                  background: `repeating-linear-gradient(
                    90deg,
                    ${color} 0px,
                    ${color} 1px,
                    transparent 2px,
                    transparent 4px
                  )`,
                  maskImage:
                    "linear-gradient(to right, black 20%, transparent 95%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, black 20%, transparent 95%)",
                }}
              />
              <span className="relative font-bold italic text-foreground">
                {part}
              </span>
            </span>
          );
        }
        return part;
      })}
    </>
  );
};

const services = [
  {
    icon: ChalkboardTeacher,
    title: "Expert Instruction",
    description:
      "Professional instructor with over 5 years of dedicated teaching experience.",
    highlightWords: ["5 years", "dedicated"],
    color: "text-primary",
    bgColor: "bg-primary/40",
  },
  {
    icon: Student,
    title: "All Levels Welcome",
    description:
      "Private virtual tutoring designed for beginner to advanced students.",
    highlightWords: ["beginner", "advanced"],
    color: "text-secondary",
    bgColor: "bg-secondary/40",
  },
  {
    icon: BookBookmark,
    title: "Core Subjects",
    description:
      "Specialized instruction in English (All Grades) and Math (K-6th).",
    highlightWords: ["English", "Math"],
    color: "text-accent",
    bgColor: "bg-accent/20",
  },
  {
    icon: VideoCamera,
    title: "Virtual Sessions",
    description: "Convenient and secure learning from home via Zoom.",
    highlightWords: ["Zoom", "secure"],
    color: "text-primary",
    bgColor: "bg-primary/20",
  },
];

const ChipRow = ({
  items,
  rowRef,
  className = "",
  badgeColor = "bg-primary",
}: {
  items: typeof backgroundChipsData;
  rowRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
  badgeColor?: string;
}) => (
  <div
    ref={rowRef}
    className={`flex gap-12 whitespace-nowrap will-change-transform ${className}`}
  >
    {items.map((chip) => (
      <div
        key={chip.id}
        className="flex items-center gap-3 bg-white/60 px-5 py-2 rounded-full border border-gray-100/30 shadow-sm backdrop-blur-[2px]"
        style={{ transform: `rotate(${chip.rotate}deg)` }}
      >
        <span className="text-[10px] font-bold tracking-widest text-foreground/40 uppercase">
          {chip.topic}
        </span>
        <span
          className={`px-2 py-0.5 rounded-full ${badgeColor} text-white text-[8px] font-black opacity-80`}
        >
          {chip.badge}
        </span>
      </div>
    ))}
    {/* Duplicate for seamless parallax */}
    {items.map((chip) => (
      <div
        key={`dup-${chip.id}`}
        className="flex items-center gap-3 bg-white/60 px-5 py-2 rounded-full border border-gray-100/30 shadow-sm backdrop-blur-[2px]"
        style={{ transform: `rotate(${chip.rotate}deg)` }}
      >
        <span className="text-[10px] font-bold tracking-widest text-foreground/40 uppercase">
          {chip.topic}
        </span>
        <span
          className={`px-2 py-0.5 rounded-full ${badgeColor} text-white text-[8px] font-black opacity-80`}
        >
          {chip.badge}
        </span>
      </div>
    ))}
  </div>
);

const microChips = ["English", "Math", "Reading", "Zoom", "Fluency", "K-6"];

const MicroChipRow = ({ direction = 1 }: { direction?: 1 | -1 }) => {
  return (
    <div
      className="micro-row absolute inset-x-0 top-1/2 flex gap-6 whitespace-nowrap
                 text-[9px] tracking-widest uppercase
                 text-foreground/10"
      style={{
        transform: `translateY(-50%) translateX(${direction * 20}px)`,
        maskImage:
          "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
      }}
    >
      {Array(4)
        .fill(microChips)
        .flat()
        .map((chip, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-full border border-white/10
                     bg-white/5 backdrop-blur-sm"
          >
            {chip}
          </span>
        ))}
    </div>
  );
};

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);
  const row4Ref = useRef<HTMLDivElement>(null);
  const row5Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");

      gsap.fromTo(
        cards,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Parallax effect for background rows - varying speeds and directions
      const rows = [row1Ref, row2Ref, row3Ref, row4Ref, row5Ref];
      rows.forEach((ref, i) => {
        const direction = i % 2 === 0 ? -1 : 1;
        const speed = 400 + i * 150; // Further increased for "superhuman" horizontal glide

        gsap.to(ref.current, {
          x: direction * speed,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5 + i * 0.5, // Smoother, more elegant scrub
          },
        });
      });

      // Micro chips parallax inside cards
      const microRows = gsap.utils.toArray<HTMLElement>(
        ".service-card .micro-row",
      );
      microRows.forEach((row, i) => {
        gsap.to(row, {
          x: i % 2 === 0 ? -40 : 40,
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-32 bg-background relative overflow-hidden flex flex-col justify-center"
    >
      {/* Background Chips - Horizontal scrolling parallax effect */}
      <div className="absolute inset-0 pointer-events-none z-0 flex flex-col justify-between py-8">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80 z-10" />
        <ChipRow
          items={backgroundChipsData.slice(0, 8)}
          rowRef={row1Ref}
          badgeColor="bg-primary"
        />
        <ChipRow
          items={backgroundChipsData.slice(8, 16)}
          rowRef={row2Ref}
          className="ml-24"
          badgeColor="bg-secondary"
        />
        <ChipRow
          items={backgroundChipsData.slice(16, 24)}
          rowRef={row3Ref}
          className="-ml-12"
          badgeColor="bg-accent"
        />
        <ChipRow
          items={backgroundChipsData.slice(24, 32)}
          rowRef={row4Ref}
          className="ml-40"
          badgeColor="bg-primary"
        />
        <ChipRow
          items={backgroundChipsData.slice(32, 40)}
          rowRef={row5Ref}
          className="-ml-32"
          badgeColor="bg-secondary"
        />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            What We Provide
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card relative overflow-hidden p-8 rounded-[2.5rem] bg-background/60 backdrop-blur-md border border-white/10 transition-all duration-500 flex flex-col items-center text-center group"
            >
              {/* Subtle moving background */}
              <div className="absolute inset-0 pointer-events-none">
                <MicroChipRow direction={index % 2 === 0 ? 1 : -1} />
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-20 h-20 rounded-2xl ${service.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                >
                  <service.icon
                    size={40}
                    weight="duotone"
                    className={service.color}
                  />
                </div>
                <h3 className="font-serif text-xl font-bold mb-3 text-foreground">
                  {service.title}
                </h3>
                <p className="font-sans text-foreground leading-relaxed text-sm">
                  <StickerHighlight
                    text={service.description}
                    highlightWords={service.highlightWords}
                  />
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Details List from Image */}
        <div className="mt-20 max-w-4xl mx-auto rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />

          <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <h3 className="font-serif text-3xl font-bold mb-6">
                Why Choose <br />
                <span className="text-primary">Yearn & Learn?</span>
              </h3>
              <p className="text-foreground leading-relaxed mb-6">
                We focus on building confidence and mastery in core subjects,
                providing a supportive environment where students can thrive.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "Professional instructor (5 years exp)",
                "English: All Grades",
                "Math: K-6th Grade",
                "Personalized Zoom Sessions",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle
                    size={24}
                    weight="fill"
                    className="text-secondary flex-shrink-0"
                  />
                  <span className="font-medium text-lg text-foreground">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
