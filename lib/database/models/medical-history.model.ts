import mongoose, { Schema, Document } from "mongoose";

interface IMedicalHistory extends Document {
  user: mongoose.Types.ObjectId;
  condition: string;
  treatment: string;
  date: Date;
  files?: string[];
}

const MedicalHistorySchema = new Schema<IMedicalHistory>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  condition: { type: String, required: true },
  treatment: { type: String },
  date: { type: Date, default: Date.now },
  files: [{ type: String, maxlength: 3 }],
});

export default mongoose.models.MedicalHistory ||
  mongoose.model<IMedicalHistory>("MedicalHistory", MedicalHistorySchema);
