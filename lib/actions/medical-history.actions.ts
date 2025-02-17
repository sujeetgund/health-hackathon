"use server";

import { connectToDatabase } from "@/lib/database";
import MedicalHistory from "@/lib/database/models/medical-history.model";
import User from "@/lib/database/models/user.model";

import { handleError } from "../utils";

export type IRecord = {
  title: string;
  condition: string;
  treatment: string;
  recordDate: Date;
  notes?: string;
  files?: string[];
};

// Create Medical Record
export async function createMedicalRecord({
  clerkId,
  record,
}: {
  clerkId: string;
  record: IRecord;
}) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    const newRecord = new MedicalHistory({
      userClerkId: clerkId,
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
  clerkId,
  mhid,
  record,
}: {
  clerkId: string;
  mhid: string;
  record: IRecord;
}) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    const updatedRecord = await MedicalHistory.findByIdAndUpdate(
      mhid,
      { ...record, userClerkId: clerkId },
      { new: true }
    );

    return JSON.parse(JSON.stringify(updatedRecord));
  } catch (error) {
    handleError(error);
  }
}

// Get Medical Record  by MHID
export async function getMedicalRecord(mhid: string) {
  try {
    await connectToDatabase();

    const record = await MedicalHistory.findById(mhid);

    return JSON.parse(JSON.stringify(record));
  } catch (error) {
    handleError(error);
  }
}

// Get All Medical Records by User ID
export async function getAllMedicalRecords(clerkId: string) {
  try {
    await connectToDatabase();

    const records = await MedicalHistory.find({ userClerkId: clerkId });
    // console.log(records);

    return JSON.parse(JSON.stringify(records));
  } catch (error) {
    handleError(error);
  }
}
