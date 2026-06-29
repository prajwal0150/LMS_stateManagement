import React from "react";
import { Sparkles, Repeat, BarChart3, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";

const LaptopMockup = () => (
  <div className="relative w-full max-w-md">
    {/* Background photo card (laptop on desk, library backdrop) */}
    <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, #3b2a1d 0%, #5c4530 35%, #8a6a45 55%, #c79a5f 70%, #e8c896 100%)",
        }}
      />
      {/* bookshelf suggestion, right side */}
      <div className="absolute right-0 top-0 h-full w-2/5 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(30,20,10,0.6) 0px, rgba(30,20,10,0.6) 14px, rgba(80,55,30,0.4) 14px, rgba(80,55,30,0.4) 28px)",
        }}
      />

      {/* Laptop base/body */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[88%]">
        {/* Screen */}
        <div className="bg-slate-900 rounded-t-xl pt-2 px-2 pb-0 shadow-2xl">
          <div className="bg-white rounded-md overflow-hidden">
            {/* Fake app top bar */}
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-100">
              <div className="w-2 h-2 rounded-full bg-red-300" />
              <div className="w-2 h-2 rounded-full bg-amber-300" />
              <div className="w-2 h-2 rounded-full bg-emerald-300" />
              <div className="ml-2 flex-1 h-2 bg-slate-100 rounded" />
            </div>
            {/* Fake dashboard body */}
            <div className="flex gap-2 p-2.5">
              <div className="w-1/4 space-y-1.5">
                <div className="h-2 w-full bg-indigo-900 rounded" />
                <div className="h-1.5 w-3/4 bg-slate-200 rounded" />
                <div className="h-1.5 w-3/4 bg-slate-200 rounded" />
                <div className="h-1.5 w-2/3 bg-slate-200 rounded" />
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="h-6 w-full bg-indigo-50 rounded" />
                <div className="h-2 w-full bg-slate-700 rounded" />
                <div className="h-2 w-5/6 bg-slate-200 rounded" />
                <div className="h-2 w-full bg-slate-200 rounded" />
                <div className="h-8 w-full bg-sky-100 rounded mt-1" />
              </div>
            </div>
          </div>
        </div>
        {/* Base hinge */}
        <div className="h-2.5 bg-slate-300 rounded-b-md shadow-md" />
        <div className="h-1.5 w-1/3 bg-slate-400 rounded-b-lg mx-auto" />
      </div>
    </div>

    {/* Floating badge: Librarian Access */}
    <div className="absolute -top-4 right-2 bg-white rounded-full shadow-lg px-4 py-2.5 flex items-center gap-2">
      <span className="w-6 h-6 rounded-full bg-indigo-950 flex items-center justify-center shrink-0">
        <ShieldCheck className="w-3.5 h-3.5 text-white" />
      </span>
      <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
        Librarian Access
      </span>
    </div>

    {/* Floating card: Real-time usage */}
    <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg px-4 py-3 w-44">
      <p className="text-[10px] font-semibold tracking-wide text-slate-400 uppercase">
        Real-time usage
      </p>
      <div className="flex items-baseline gap-2 mt-1">
        <span className="text-lg font-bold text-indigo-950">12.4k</span>
        <BarChart3 className="w-3.5 h-3.5 text-orange-400" />
      </div>
      <p className="text-xs text-slate-400 mt-0.5">Active patrons today</p>
    </div>
  </div>
);

const FeatureItem = ({ icon: Icon, label }) => (
  <div className="flex flex-col items-start gap-2">
    <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
      <Icon className="w-4.5 h-4.5 text-indigo-950" strokeWidth={1.8} />
    </div>
    <span className="text-sm font-semibold text-slate-800 leading-tight">
      {label}
    </span>
  </div>
);

const Hero = () => (
  <section className="bg-indigo-50/40">
    <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
      {/* Left column */}
      <div>
        <div className="inline-flex items-center gap-1.5 bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          <ShieldCheck className="w-3.5 h-3.5" />
          TRUSTED BY 2,000+ LIBRARIES
        </div>

        <h1 className="font-serif text-5xl leading-[1.1] text-indigo-950 mb-6">
          <span className="font-bold">Modernize Your</span>
          <br />
          <span className="italic font-semibold">Library Management</span>
        </h1>

        <p className="text-slate-500 text-base leading-relaxed max-w-md mb-8">
          Empower your librarians and engage your community with our
          all-in-one digital platform designed for contemporary scholarship.
        </p>

        <div className="flex items-center gap-3 mb-10">
          <button className="bg-indigo-950 hover:bg-indigo-900 text-white text-sm font-medium px-6 py-3 rounded-lg transition-colors">
            Get Started
          </button>
          <button className="border border-indigo-950 text-indigo-950 hover:bg-indigo-50 text-sm font-medium px-6 py-3 rounded-lg transition-colors">
            Request a Demo
          </button>
        </div>

        <div className="border-t border-slate-200 pt-6 grid grid-cols-3 gap-6 max-w-md">
          <FeatureItem icon={Sparkles} label="Smart Cataloging" />
          <FeatureItem icon={Repeat} label="Circulation" />
          <FeatureItem icon={BarChart3} label="Insightful Analytics" />
        </div>
      </div>

      {/* Right column */}
      <div className="flex justify-center md:justify-end">
        <LaptopMockup />
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-indigo-50/40 border-t border-slate-200">
    <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <div>
        <p className="font-serif font-bold text-indigo-950">Scholarly LMS</p>
        <p className="text-xs text-slate-400 mt-0.5">
          © 2024 Scholarly LMS. All rights reserved.
        </p>
      </div>
      <div className="flex items-center gap-6 text-sm text-indigo-700 font-medium">
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
        <a href="#" className="hover:underline">
          Terms of Service
        </a>
        <a href="#" className="hover:underline">
          Contact
        </a>
      </div>
    </div>
  </footer>
);

const Landing = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
        <Navbar/>
      <Hero />
      <Footer />
    </div>
  );
};

export default Landing;