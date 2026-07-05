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
      {/* <button
        className="fixed top-4 right-4 z-50 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={() => {
          const token = localStorage.getItem("token");
          console.log("Token:", token);
        }}
      >
        Log Token
      </button> */}
      <Navbar />
      <HeroSection />
      <Features />
      <HowItWorks />
      <ResumeUpload />
      <Footer />
    </div>
  );
}
