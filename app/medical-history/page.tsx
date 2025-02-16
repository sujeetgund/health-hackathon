import React from "react";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MedicalRecordsList from "@/components/shared/MedicalRecordsList";
import { getAllMedicalRecords } from "@/lib/actions/medical-history.actions";
import { IMedicalHistory } from "@/lib/database/models/medical-history.model";

const page = async () => {
  const { userId, redirectToSignIn } = await auth();

  // Return to signin if no user
  if (!userId) return redirectToSignIn();

  // Get medical records by userId
  const records: IMedicalHistory[] = await getAllMedicalRecords(userId);
  return (
    <div className="wrapper">
      <div className="flex-between mb-8">
        <h1 className="h2-bold">Medical History</h1>
        <Link href="/medical-history/create">
          <Button>
            <Plus className="mr-1 h-4 w-4" /> Add Record
          </Button>
        </Link>
      </div>
      <MedicalRecordsList records={records} />
    </div>
  );
};

export default page;
