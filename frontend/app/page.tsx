"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import LivePreviewSection from "@/components/landing/LivePreviewSection";
import Footer from "@/components/landing/Footer";

const ThreeBackground = dynamic(
  () => import("@/components/three/ThreeBackground"),
  { ssr: false }
);

export default function HomePage() {
  return (
    <main className="min-h-screen relative">
      <ThreeBackground />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <LivePreviewSection />
      <Footer />
    </main>
  );
}