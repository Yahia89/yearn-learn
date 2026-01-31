"use client";

import Navbar from "@/components/layout/Navbar";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";

export default function ContactPage() {
  useGSAP(() => {
    gsap.from(".page-header", {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-32 pb-10 px-6 text-center page-header">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4">
          Get in <span className="text-primary">Touch</span>
        </h1>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          Have questions about our tutoring programs? We're here to help you find the perfect learning path.
        </p>
      </section>

      {/* Reuse the existing Contact Component */}
      <Contact />

      {/* Additional FAQ or Info could go here */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="p-6 rounded-2xl bg-gray-50 hover:bg-soft-yellow/10 transition-colors">
              <h3 className="font-bold text-lg mb-2 text-foreground">How are sessions conducted?</h3>
              <p className="text-foreground/70">All sessions are conducted virtually via Zoom, ensuring a safe and convenient learning environment.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 hover:bg-soft-yellow/10 transition-colors">
              <h3 className="font-bold text-lg mb-2 text-foreground">What subjects do you cover?</h3>
              <p className="text-foreground/70">We specialize in English for all grade levels and Math for Kindergarten through 6th grade.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 hover:bg-soft-yellow/10 transition-colors">
              <h3 className="font-bold text-lg mb-2 text-foreground">Do you offer trial sessions?</h3>
              <p className="text-foreground/70">Yes! Contact us to discuss scheduling an initial consultation or trial session.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 hover:bg-soft-yellow/10 transition-colors">
              <h3 className="font-bold text-lg mb-2 text-foreground">What is your cancellation policy?</h3>
              <p className="text-foreground/70">We appreciate 24 hours notice for any cancellations or rescheduling requests.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
