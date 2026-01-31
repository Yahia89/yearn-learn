"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { List, X, GraduationCap } from "@phosphor-icons/react";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useGSAP(() => {
    gsap.from(".nav-item", {
      y: -20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Me", href: "/about" },
    { name: "Contact Me", href: "/contact" },
  ];

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4",
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group z-50 relative">
          <GraduationCap
            size={32}
            weight="duotone"
            className="text-primary group-hover:rotate-12 transition-transform duration-300"
          />
          <span className="font-serif text-2xl font-bold text-foreground tracking-tight">
            Yearn & Learn
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="nav-item inline-flex items-center text-foreground font-medium hover:text-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Link
            href="/contact"
            className="nav-item inline-flex items-center justify-center px-6 py-2 bg-primary text-white rounded-full font-medium hover:bg-opacity-90 transition-transform hover:scale-105 active:scale-95 shadow-md shadow-primary/20 translate-y-[1px]"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle - Fixed to viewport to stay consistent */}
        <button
          className="md:hidden text-foreground p-2 z-50 fixed top-4 right-6"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <List size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mounted &&
        createPortal(
          <div
            className={clsx(
              "md:hidden fixed inset-0 z-[100] bg-background/98 backdrop-blur-xl transition-transform duration-500 ease-in-out overflow-y-auto",
              isOpen ? "translate-x-0" : "translate-x-full",
            )}
          >
            <div className="min-h-full w-full flex flex-col items-center justify-center gap-8 py-20 px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-serif font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="px-10 py-4 bg-primary text-white rounded-full font-bold text-xl shadow-lg shadow-primary/30 mt-4 hover:scale-105 transition-transform"
              >
                Get Started
              </Link>
            </div>
          </div>,
          document.body,
        )}
    </nav>
  );
}
