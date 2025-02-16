"use server";

// import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import MedicalHistory from "@/lib/database/models/medical-history.model";
import User from "@/lib/database/models/user.model";

import { handleError } from "../utils";

// Create Medical Record
export async function createMedicalRecord({
  userId,
  record,
}: {
  userId: string;
  record: {
    title: string;
    condition: string;
    treatment: string;
    recordDate: Date;
    files?: string[];
  };
}) {
  try {
    await connectToDatabase();

    // const user = await User.findById(userId);

    // if (!user) {
    //   throw new Error("User not found");
    // }

    const newRecord = new MedicalHistory({
      user: userId,
      ...record,
    });

    await newRecord.save();

    return JSON.parse(JSON.stringify(newRecord));
  } catch (error) {
    handleError(error);
  }
}

// Update Medical Record
export async function updateMedicalRecord({
  userId,
  mhid,
  record,
}: {
  userId: string;
  mhid: string;
  record: {
    title: string;
    condition: string;
    treatment: string;
    recordDate: Date;
    files?: string[];
  };
}) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const updatedRecord = await MedicalHistory.findByIdAndUpdate(
      mhid,
      { ...record },
      { new: true }
    );

    return JSON.parse(JSON.stringify(updatedRecord));
  } catch (error) {
    handleError(error);
  }
}
