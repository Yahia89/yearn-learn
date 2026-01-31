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

const services = [
  {
    icon: ChalkboardTeacher,
    title: "Expert Instruction",
    description: "Professional instructor with over three years of dedicated teaching experience.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Student,
    title: "All Levels Welcome",
    description: "Private virtual tutoring designed for beginner to advanced students.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: BookBookmark,
    title: "Core Subjects",
    description: "Specialized instruction in English (All Grades) and Math (K-6th).",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: VideoCamera,
    title: "Virtual Sessions",
    description: "Convenient and secure learning from home via Zoom.",
    color: "text-foreground",
    bgColor: "bg-foreground/5",
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");
      
      gsap.from(cards, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="about" ref={containerRef} className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            What We Provide
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card p-8 rounded-3xl bg-background border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center group"
            >
              <div
                className={`w-20 h-20 rounded-2xl ${service.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
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
              <p className="font-sans text-foreground/70 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Details List from Image */}
        <div className="mt-20 max-w-4xl mx-auto bg-soft-yellow/20 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
          
          <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <h3 className="font-serif text-3xl font-bold mb-6">
                Why Choose <br />
                <span className="text-primary">Yearn & Learn?</span>
              </h3>
              <p className="text-foreground/80 mb-6">
                We focus on building confidence and mastery in core subjects, providing a supportive environment where students can thrive.
              </p>
            </div>
            <div className="space-y-4">
              {[
                "Professional instructor (3+ years exp)",
                "English: All Grades",
                "Math: K-6th Grade",
                "Personalized Zoom Sessions",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle size={24} weight="fill" className="text-secondary flex-shrink-0" />
                  <span className="font-medium text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
