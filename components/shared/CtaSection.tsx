import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const CtaSection = () => {
  return (
    <section className="bg-accent py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Take Control of Your Health Records?
        </h2>
        <p className="text-xl mb-8">
          Join thousands of users who trust us with their medical history.
        </p>
        <Button asChild size="lg" className="rounded-full">
          <Link href="/medical-history/create">Add Your Records</Link>
        </Button>
      </div>
    </section>
  );
};

export default CtaSection;
