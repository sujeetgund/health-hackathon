import React from "react";
// import { Button } from "../ui/button";
// import Link from "next/link";

const ContentSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">
              Empowering Patients and Healthcare Providers
            </h2>
            <p className="text-lg mb-4">
              Our platform bridges the gap between patients and healthcare
              providers, ensuring that critical medical information is always at
              your fingertips.
            </p>
            <p className="text-lg mb-6">
              Whether you&apos;re managing a chronic condition, preparing for a
              doctor&apos;s visit, or just keeping track of your health journey,
              we&apos;ve got you covered.
            </p>
            {/* <Button asChild variant="outline">
              <Link href="/about">Learn More About Us</Link>
            </Button> */}
          </div>
          <div className="md:w-1/2">
            <img
              src="/assets/images/healthcare-workers-using-medimind.jpg"
              alt="Medical professionals using our platform"
              className="rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
