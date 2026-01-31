"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  User,
  ChalkboardTeacher,
  CheckCircle,
  GraduationCap,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useRef } from "react";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-content", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section ref={containerRef} className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="about-content text-center mb-16">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
              About <span className="text-primary">Layann Hamida</span>
            </h1>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Passionate educator dedicated to building confidence and mastery
              in students of all ages.
            </p>
          </div>

          <div className="about-content bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-soft-yellow/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
              <div className="w-48 h-48 md:w-64 md:h-64 bg-gray-200 rounded-full flex-shrink-0 border-8 border-white shadow-lg overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                <User size={80} weight="duotone" className="text-primary/50" />
              </div>

              <div className="flex-1 space-y-6">
                <h2 className="font-serif text-3xl font-bold text-foreground">
                  A Personal Approach to Learning
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  With over 5 years of professional teaching experience, I
                  believe that every student has a unique learning style. My
                  mission is to identify those strengths and use them to
                  overcome challenges in English and Math.
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  Whether your child is just starting their academic journey in
                  Kindergarten or preparing for advanced studies, I provide a
                  supportive, encouraging environment where mistakes are seen as
                  learning opportunities.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {[
                    "5 Years Experience",
                    "K-6th Math Specialist",
                    "All-Grades English",
                    "Customized Curriculum",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle
                        size={20}
                        weight="fill"
                        className="text-secondary"
                      />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-gradient-to-b from-white to-soft-yellow/20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 space-y-6">
              <h2 className="font-serif text-4xl font-bold text-foreground">
                Teaching Philosophy
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                I believe that "yearning" to learn comes from confidence. When a
                student understands the <i>why</i> behind a concept, the{" "}
                <i>how</i> becomes much easier.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                My sessions are interactive, engaging, and tailored to the
                specific needs of each student. We don't just memorize formulas
                or grammar rules; we build a foundation of understanding that
                lasts a lifetime.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-transform hover:scale-105 shadow-lg shadow-primary/20 mt-4"
              >
                Book a Session
                <GraduationCap size={20} weight="fill" />
              </Link>
            </div>

            <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center">
                  <ChalkboardTeacher
                    size={40}
                    weight="duotone"
                    className="text-accent mb-3"
                  />
                  <h3 className="font-bold text-lg">Patient</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center">
                  <GraduationCap
                    size={40}
                    weight="duotone"
                    className="text-primary mb-3"
                  />
                  <h3 className="font-bold text-lg">Expert</h3>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center">
                  <User
                    size={40}
                    weight="duotone"
                    className="text-secondary mb-3"
                  />
                  <h3 className="font-bold text-lg">Personal</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center">
                  <CheckCircle
                    size={40}
                    weight="duotone"
                    className="text-green-500 mb-3"
                  />
                  <h3 className="font-bold text-lg">Proven</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
