import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  medicalHistory: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  medicalHistory: [
    { type: mongoose.Schema.Types.ObjectId, ref: "MedicalHistory" },
  ],
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
