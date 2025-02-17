import { Clock, FileText, Shield } from "lucide-react";
import React from "react";

const FeatureSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Our Platform?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Shield className="h-10 w-10 text-primary" />}
            title="Secure Storage"
            description="Your medical records are encrypted and stored with the highest security standards."
          />
          <FeatureCard
            icon={<Clock className="h-10 w-10 text-primary" />}
            title="24/7 Access"
            description="Access your medical history anytime, anywhere, from any device."
          />
          <FeatureCard
            icon={<FileText className="h-10 w-10 text-primary" />}
            title="Comprehensive Records"
            description="Store and organize all types of medical documents, from prescriptions to test results."
          />
        </div>
      </div>
    </section>
  );
};

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md">
      {icon}
      <h3 className="text-xl font-semibold mt-4 mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default FeatureSection;
