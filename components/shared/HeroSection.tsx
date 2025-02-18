import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
// import { auth } from "@clerk/nextjs/server";

const HeroSection = async () => {
  // const { userId } = await auth();
  return (
    <section className="bg-dotted-pattern bg-contain bg-primary-50 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Your Medical History, Simplified
        </h1>
        <p className="text-xl mb-8">
          Secure, organized, and always accessible.
        </p>
        <SignedOut>
          <Button asChild size="lg" variant="default" className="rounded-full">
            <Link href="/sign-up">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </SignedOut>
        <SignedIn>
          <div className="flex justify-center gap-4 sm:gap-8 mt-8 flex-col md:flex-row">
            <Button
              asChild
              size="lg"
              variant="default"
              className="rounded-full"
            >
              <Link href="/dashboard">
                Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border border-primary"
            >
              <Link href="/medical-history/create">
                <Plus className="mr-2 h-4 w-4" /> Add New Record
              </Link>
            </Button>
          </div>
        </SignedIn>
      </div>
    </section>
  );
};

export default HeroSection;
