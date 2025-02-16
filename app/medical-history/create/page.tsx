import React from "react";
import MedicalRecordForm from "@/components/shared/MedicalRecordForm";
import { auth } from "@clerk/nextjs/server";

const CreateMedicalRecordPage = async () => {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Add New Record
        </h3>
      </section>

      <div className="wrapper my-8">
        <MedicalRecordForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateMedicalRecordPage;
