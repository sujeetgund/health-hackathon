import React from "react";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MedicalRecordsList from "@/components/shared/MedicalRecordsList";

const page = async () => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();
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
      <MedicalRecordsList />
    </div>
  );
};

export default page;
