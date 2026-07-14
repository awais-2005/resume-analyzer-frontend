"use client";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import ResumeUpload from "@/components/ResumeUpload";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <Features />
      <HowItWorks />
      <ResumeUpload />
      <Footer />
    </div>
  );
}
