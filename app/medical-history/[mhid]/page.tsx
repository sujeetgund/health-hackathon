import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// This would be replaced with actual data fetching
const getMedicalRecord = (id: string) => {
  return {
    id,
    name: "Annual Checkup 2024",
    type: "General",
    doctor: "Dr. Smith",
    date: new Date(),
    notes:
      "Regular checkup with blood pressure monitoring and general health assessment.",
  };
};

export default async function RecordDetailPage({
  params,
}: {
  params: { mhid: string };
}) {
  const { mhid } = await params;
  const record = getMedicalRecord(mhid);

  return (
    <div className="wrapper">
      <div className="mb-8">
        <Link href="/medical-history">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Medical History
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{record.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="p-medium-16">Type</h3>
                <p className="p-regular-14 text-muted-foreground">
                  {record.type}
                </p>
              </div>
              <div>
                <h3 className="p-medium-16">Doctor</h3>
                <p className="p-regular-14 text-muted-foreground">
                  {record.doctor}
                </p>
              </div>
              <div>
                <h3 className="p-medium-16">Date</h3>
                <p className="p-regular-14 text-muted-foreground">
                  {record.date.toLocaleDateString()}
                </p>
              </div>
            </div>

            <div>
              <h3 className="p-medium-16 mb-2">Notes</h3>
              <p className="p-regular-14 text-muted-foreground">
                {record.notes}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
