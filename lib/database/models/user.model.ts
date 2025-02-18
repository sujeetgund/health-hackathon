import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  clerkId: string;
  name: string;
  email: string;
  photo: string;
  healthOverview?: {
    bloodPressure: string;
    heartRate: string;
    sugarLevel: string;
    medicationAdherence: string;
  };
  medicalHistory: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  photo: { type: String },
  healthOverview: {
    bloodPressure: { type: String },
    heartRate: { type: String },
    sugarLevel: { type: String },
    medicationAdherence: { type: String },
  },
  medicalHistory: [
    { type: mongoose.Schema.Types.ObjectId, ref: "MedicalHistory" },
  ],
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
