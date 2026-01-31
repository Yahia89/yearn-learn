"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BookOpen,
  MathOperations,
  Pencil,
  Atom,
  Pi,
  Calculator,
  Plus,
  Minus,
  X,
  Divide,
} from "@phosphor-icons/react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Initial reveal animation
      tl.from(".hero-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      })
        .from(
          ".hero-btn",
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        )
        .from(
          ".floating-shape",
          {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "elastic.out(1, 0.5)",
          },
          "-=1"
        );

      // Parallax/Spring effect on scroll
      const shapes = gsap.utils.toArray<HTMLElement>(".floating-shape");
      shapes.forEach((shape, i) => {
        gsap.to(shape, {
          y: (i + 1) * -50, // Varying speeds
          rotation: (i % 2 === 0 ? 1 : -1) * 45,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1, // Smooth scrubbing
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-soft-yellow/20 pt-20"
    >
      {/* Floating Shapes Background */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none z-0">
        <Plus
          weight="duotone"
          className="floating-shape absolute top-[15%] left-[10%] text-primary/40 w-16 h-16 md:w-24 md:h-24"
        />
        <BookOpen
          weight="duotone"
          className="floating-shape absolute top-[20%] right-[15%] text-secondary/40 w-20 h-20 md:w-32 md:h-32"
        />
        <MathOperations
          weight="duotone"
          className="floating-shape absolute bottom-[20%] left-[15%] text-accent/40 w-16 h-16 md:w-28 md:h-28"
        />
        <Pencil
          weight="duotone"
          className="floating-shape absolute top-[40%] left-[5%] text-primary/30 w-12 h-12"
        />
        <Atom
          weight="duotone"
          className="floating-shape absolute bottom-[30%] right-[10%] text-secondary/30 w-14 h-14 md:w-24 md:h-24"
        />
        <Pi
          weight="duotone"
          className="floating-shape absolute top-[10%] right-[30%] text-accent/30 w-10 h-10 md:w-16 md:h-16"
        />
        <Calculator
          weight="duotone"
          className="floating-shape absolute bottom-[15%] left-[40%] text-primary/20 w-12 h-12 md:w-20 md:h-20"
        />
        <Minus
          weight="duotone"
          className="floating-shape absolute top-[60%] right-[5%] text-secondary/30 w-8 h-8 md:w-12 md:h-12"
        />
        <X
          weight="duotone"
          className="floating-shape absolute top-[30%] left-[25%] text-accent/20 w-10 h-10"
        />
        <Divide
          weight="duotone"
          className="floating-shape absolute bottom-[40%] right-[25%] text-primary/20 w-10 h-10"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="hero-text font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 tracking-tight">
          <span className="inline-block text-primary">Yearn</span>{" "}
          <span className="inline-block text-secondary">&</span>{" "}
          <span className="inline-block text-foreground">Learn</span>
        </h1>
        
        <p className="hero-text font-sans text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Unlocking potential, one lesson at a time. Professional virtual tutoring
          tailored to your child's unique learning journey.
        </p>
        
        <div className="hero-btn flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#contact"
            className="px-8 py-4 bg-primary text-white text-lg font-bold rounded-full shadow-xl hover:bg-primary/90 hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            Book a Session
          </Link>
          <Link
            href="#about"
            className="px-8 py-4 bg-white text-foreground border-2 border-foreground/10 text-lg font-bold rounded-full hover:bg-gray-50 hover:border-foreground/30 transition-all duration-300 w-full sm:w-auto"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-foreground/50">
        <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-current rounded-full" />
        </div>
      </div>
    </section>
  );
}
