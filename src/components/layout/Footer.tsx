"use client";

import Link from "next/link";
import {
  BookOpen,
  Pencil,
  Student,
  Chalkboard,
  Atom,
  Globe,
  Calculator,
  Brain,
  Lightbulb,
  Scroll,
  Palette,
  Flask,
} from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-foreground to-gray-900 text-white py-16 relative overflow-hidden">
      {/* Decorative Educational Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        <BookOpen
          size={120}
          weight="duotone"
          className="absolute top-10 left-10 text-white animate-pulse"
        />
        <Pencil
          size={80}
          weight="duotone"
          className="absolute bottom-20 right-20 text-white rotate-45"
        />
        <Student
          size={100}
          weight="duotone"
          className="absolute top-1/2 left-20 text-white -rotate-12"
        />
        <Chalkboard
          size={140}
          weight="duotone"
          className="absolute bottom-10 left-1/3 text-white"
        />
        <Atom
          size={90}
          weight="duotone"
          className="absolute top-20 right-1/4 text-white animate-spin-slow"
        />
        <Globe
          size={110}
          weight="duotone"
          className="absolute bottom-1/3 right-10 text-white"
        />
        <Calculator
          size={70}
          weight="duotone"
          className="absolute top-10 right-10 text-white rotate-12"
        />
        <Brain
          size={85}
          weight="duotone"
          className="absolute top-1/3 left-1/3 text-white"
        />
        <Lightbulb
          size={60}
          weight="duotone"
          className="absolute bottom-1/4 left-10 text-white"
        />
        <Scroll
          size={90}
          weight="duotone"
          className="absolute top-1/4 right-20 text-white -rotate-12"
        />
        <Palette
          size={75}
          weight="duotone"
          className="absolute bottom-10 right-1/3 text-white"
        />
        <Flask
          size={65}
          weight="duotone"
          className="absolute top-1/2 right-1/2 text-white"
        />
      </div>

      {/* Decorative Gradients/Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-white/10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="mb-8">
          <span className="font-serif text-3xl font-bold tracking-tight">
            Yearn & Learn
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-10 text-white/70">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About Me
          </Link>
          <Link
            href="/contact"
            className="hover:text-primary transition-colors"
          >
            Contact Me
          </Link>
        </div>

        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-8" />

        <p className="font-serif text-lg opacity-80 mb-4">
          &copy; {new Date().getFullYear()} Yearn & Learn. All rights reserved.
        </p>
        <p className="text-sm opacity-50">
          Designed with <span className="text-red-500 animate-pulse">♥</span>{" "}
          for education.
        </p>
      </div>
    </footer>
  );
}
