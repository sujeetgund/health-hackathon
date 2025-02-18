import { IMedicalHistory } from "@/lib/database/models/medical-history.model";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const RecentMedicalRecords = ({
  recentRecords,
}: {
  recentRecords: IMedicalHistory[];
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Medical Records</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recentRecords.map((record) => (
            <li
              key={record.title}
              className="flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{record.title}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(record.recordDate).toLocaleDateString("en-In")} -{" "}
                  {record.condition}
                </p>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/medical-history/${record._id}`}>
                  View <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentMedicalRecords;
