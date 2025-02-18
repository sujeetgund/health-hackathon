"use server";

import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { handleError } from "../utils";

type CreateUserProps = {
  email: string;
  name: string;
  clerkId: string;
  photo: string;
};

type UpdateUserProps = {
  clerkId: string;
  name: string;
  email: string;
  photo: string;
};

// Create User in MongoDB
export async function createUser({
  email,
  name,
  clerkId,
  photo,
}: CreateUserProps) {
  try {
    await connectToDatabase();

    const user = new User({
      clerkId,
      name,
      email,
      photo,
    });

    await user.save();

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

// Update User in MongoDB
export async function updateUser({
  clerkId,
  name,
  email,
  photo,
}: UpdateUserProps) {
  try {
    await connectToDatabase();

    const modifiedUser = await User.findOneAndUpdate(
      { clerkId },
      { clerkId, name, email, photo },
      { new: true }
    );
    if (!modifiedUser) throw new Error("User update failed");
    return JSON.parse(JSON.stringify(modifiedUser));
  } catch (error) {
    handleError(error);
  }
}

// Add or Update Health Overview in User in MongoDB
export async function addOrUpdateHealthOverview(
  clerkId: string,
  healthOverview: {
    bloodPressure: string;
    heartRate: string;
    sugarLevel: string;
    medicationAdherence: string;
  }
) {
  try {
    await connectToDatabase();

    // console.log(healthOverview);

    const modifiedUser = await User.findOneAndUpdate(
      { clerkId },
      { healthOverview },
      { new: true }
    );
    if (!modifiedUser) {
      console.log("Health Overview update failed");
      throw new Error("Health Overview update failed");
    }
    // console.log(modifiedUser)
    return JSON.parse(JSON.stringify(modifiedUser));
  } catch (error) {
    handleError(error);
  }
}

// Get Health Overview in User in MongoDB
export async function getHealthOverview(clerkId: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId });
    if (!user) throw new Error("User not found");

    if (!user.healthOverview)
      return {
        bloodPressure: "",
        heartRate: "",
        sugarLevel: "",
        medicationAdherence: "",
      };

    return JSON.parse(JSON.stringify(user?.healthOverview));
  } catch (error) {
    handleError(error);
  }
}
