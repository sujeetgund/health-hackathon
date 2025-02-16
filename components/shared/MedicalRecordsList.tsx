"use client";

import { useMemo } from "react";
import { FileText } from "lucide-react";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import { IMedicalHistory } from "@/lib/database/models/medical-history.model";

type Section = {
  title: string;
  records: IMedicalHistory[];
};

function groupRecordsByDate(records: IMedicalHistory[]): Section[] {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const sections: { [key: string]: IMedicalHistory[] } = {
    "This Month": [],
    "Last Month": [],
    "This Year": [],
    "Last Year": [],
    Older: [],
  };

  records.forEach((record) => {
    const recordDate = new Date(record.recordDate);
    const recordYear = recordDate.getFullYear();
    const recordMonth = recordDate.getMonth();

    if (recordYear === currentYear && recordMonth === currentMonth) {
      sections["This Month"].push(record);
    } else if (recordYear === currentYear && recordMonth === currentMonth - 1) {
      sections["Last Month"].push(record);
    } else if (recordYear === currentYear) {
      sections["This Year"].push(record);
    } else if (recordYear === currentYear - 1) {
      sections["Last Year"].push(record);
    } else {
      sections["Older"].push(record);
    }
  });

  return (
    Object.entries(sections)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, records]) => records.length > 0)
      .map(([title, records]) => ({ title, records }))
  );
}

export default function MedicalRecordsList({
  records,
}: {
  records: IMedicalHistory[];
}) {
  const sections = useMemo(() => groupRecordsByDate(records), [records]);

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
                <Link
                  href={`/medical-history/${record._id}`}
                  key={record.title}
                >
                  <Card className="hover:bg-accent/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="p-medium-16">{record.title}</h3>
                          <p className="p-regular-14 text-muted-foreground">
                            {record.condition}
                          </p>
                          <p className="p-regular-12 text-muted-foreground">
                            {new Date(record.recordDate).toLocaleDateString()}
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
