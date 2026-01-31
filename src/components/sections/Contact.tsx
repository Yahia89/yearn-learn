"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Envelope, Phone, User, PaperPlaneRight, Chalkboard } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  studentGrade: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Please tell us a bit more about your needs"),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  useGSAP(
    () => {
      gsap.from(".contact-content", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="contact" ref={containerRef} className="py-24 bg-gradient-to-t from-soft-yellow/30 to-white relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Contact Info Side */}
          <div className="contact-content space-y-8">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                Let's Start Learning
              </h2>
              <p className="text-foreground/70 text-lg">
                Ready to unlock your child's potential? Reach out today to schedule a session or ask any questions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <User size={24} weight="duotone" />
                </div>
                <div>
                  <p className="text-sm text-foreground/50 font-bold uppercase tracking-wider">Instructor</p>
                  <p className="text-xl font-serif font-bold">Layann Hamida</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                  <Phone size={24} weight="duotone" />
                </div>
                <div>
                  <p className="text-sm text-foreground/50 font-bold uppercase tracking-wider">Phone</p>
                  <a href="tel:6265363944" className="text-xl font-serif font-bold hover:text-secondary transition-colors">
                    (626)-536-3944
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                  <Envelope size={24} weight="duotone" />
                </div>
                <div>
                  <p className="text-sm text-foreground/50 font-bold uppercase tracking-wider">Email</p>
                  <a href="mailto:YEARNNDLEARN@GMAIL.COM" className="text-xl font-serif font-bold hover:text-accent transition-colors break-all">
                    YEARNNDLEARN@GMAIL.COM
                  </a>
                </div>
              </div>
            </div>

            {/* Decor */}
            <div className="relative h-40 rounded-3xl overflow-hidden bg-primary/5 flex items-center justify-center">
              <Chalkboard size={80} weight="duotone" className="text-primary/20" />
              <p className="absolute text-primary/40 font-serif text-xl italic">"Education is the kindling of a flame"</p>
            </div>
          </div>

          {/* Form Side */}
          <div className="contact-content bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-100 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-bl-[100%] rounded-tr-[2.5rem] -z-0" />
            
            <h3 className="font-serif text-2xl font-bold mb-6 relative z-10">Send a Message</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground/70 ml-1">Parent's Name</label>
                  <input
                    {...register("name")}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name.message}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground/70 ml-1">Phone Number</label>
                  <input
                    {...register("phone")}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="(555) 555-5555"
                  />
                  {errors.phone && <p className="text-red-500 text-xs ml-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground/70 ml-1">Email Address</label>
                <input
                  {...register("email")}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email.message}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground/70 ml-1">Student Grade (Optional)</label>
                  <select
                    {...register("studentGrade")}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                  >
                    <option value="">Select Grade</option>
                    <option value="K">Kindergarten</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i} value={i + 1}>{i + 1}th Grade</option>
                    ))}
                    <option value="College">College</option>
                    <option value="Adult">Adult</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground/70 ml-1">Subject (Optional)</label>
                  <select
                    {...register("subject")}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                  >
                    <option value="">Select Subject</option>
                    <option value="Math">Math</option>
                    <option value="English">English</option>
                    <option value="Both">Both</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-foreground/70 ml-1">Message</label>
                <textarea
                  {...register("message")}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                />
                {errors.message && <p className="text-red-500 text-xs ml-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={clsx(
                  "w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2",
                  isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary/90 hover:scale-[1.02] shadow-lg shadow-primary/20"
                )}
              >
                {isSubmitting ? "Sending..." : (
                  <>
                    Send Message
                    <PaperPlaneRight size={20} weight="bold" />
                  </>
                )}
              </button>

              {submitStatus === "success" && (
                <div className="p-4 bg-green-50 text-green-600 rounded-xl text-center font-medium animate-pulse">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-center font-medium">
                  Something went wrong. Please try again or email us directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
