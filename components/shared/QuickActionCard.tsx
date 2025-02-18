import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { FileText, NotepadText, Plus } from "lucide-react";

const QuickActionCardSection = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <QuickActionCard
        icon={<FileText className="h-6 w-6" />}
        title="View Records"
        description="Access your complete medical history"
        href="/medical-history"
      />
      <QuickActionCard
        icon={<Plus className="h-6 w-6" />}
        title="Add New Record"
        description="Log a new medical event or document"
        href="/medical-history/create"
      />
      <QuickActionCard
        icon={<NotepadText className="h-6 w-6" />}
        title="Notes"
        description="Save some notes for yourself"
        href="/medical-history/create"
      />
    </div>
  );
};

function QuickActionCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <Button className="w-full mt-4" asChild>
          <Link href={href}>Go to {title}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default QuickActionCardSection;
