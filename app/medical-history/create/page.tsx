import React from "react";
import MedicalRecordForm from "@/components/shared/MedicalRecordForm";
import { auth } from "@clerk/nextjs/server";

const CreateMedicalRecordPage = async () => {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  return (
    <>
      <div className="wrapper my-8">
        <MedicalRecordForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateMedicalRecordPage;
