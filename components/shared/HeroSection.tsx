import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-dotted-pattern bg-contain bg-primary-50 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Your Medical History, Simplified
        </h1>
        <p className="text-xl mb-8">
          Secure, organized, and always accessible.
        </p>
        <Button asChild size="lg" variant="default" className="rounded-full">
          <Link href="/sign-up">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
