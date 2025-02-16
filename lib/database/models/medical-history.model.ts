import mongoose, { Schema, Document } from "mongoose";

export interface IMedicalHistory extends Document {
  user: string;
  title: string;
  condition: string;
  treatment: string;
  recordDate: Date;
  notes?: string;
  files?: string[];
}

const MedicalHistorySchema = new Schema<IMedicalHistory>({
  user: { type: String, required: true },
  title: { type: String, required: true },
  condition: { type: String, required: true },
  treatment: { type: String },
  recordDate: { type: Date, default: Date.now },
  notes: { type: String },
  files: [{ type: String }],
});

export default mongoose.models.MedicalHistory ||
  mongoose.model<IMedicalHistory>("MedicalHistory", MedicalHistorySchema);
