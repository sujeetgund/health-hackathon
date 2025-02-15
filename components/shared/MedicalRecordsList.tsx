"use client";

import { FileText } from "lucide-react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";

// Mock data - replace with actual data fetching
const mockRecords = {
  today: [
    {
      id: 1,
      name: "Annual Checkup 2024",
      date: new Date(),
      type: "General",
      doctor: "Dr. Smith",
    },
  ],
  thisWeek: [
    {
      id: 2,
      name: "Dental Cleaning",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      type: "Dental",
      doctor: "Dr. Johnson",
    },
    {
      id: 3,
      name: "Blood Test Results",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      type: "Laboratory",
      doctor: "Dr. Williams",
    },
  ],
  lastWeek: [
    {
      id: 4,
      name: "X-Ray Report",
      date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      type: "Radiology",
      doctor: "Dr. Brown",
    },
    {
      id: 5,
      name: "Cardiology Consultation",
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      type: "Cardiology",
      doctor: "Dr. Davis",
    },
  ],
};

type TimeSection = {
  title: string;
  records: Array<{
    id: number;
    name: string;
    date: Date;
    type: string;
    doctor: string;
  }>;
};

const sections: TimeSection[] = [
  { title: "Today", records: mockRecords.today },
  { title: "Earlier this week", records: mockRecords.thisWeek },
  { title: "Last week", records: mockRecords.lastWeek },
];

export default function MedicalRecordsList() {
  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <Collapsible key={section.title} defaultOpen>
          <CollapsibleTrigger className="flex items-center gap-2 p-2 w-full hover:bg-accent rounded-lg">
            <h2 className="p-semibold-18 text-left">
              {section.title} ({section.records.length})
            </h2>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {section.records.map((record) => (
                <Link href={`/medical-history/${record.id}`} key={record.id}>
                  <Card className="hover:bg-accent/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="p-medium-16">{record.name}</h3>
                          <p className="p-regular-14 text-muted-foreground">
                            {record.type} • {record.doctor}
                          </p>
                          <p className="p-regular-12 text-muted-foreground">
                            {record.date.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
