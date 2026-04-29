import mongoose, { Model, models, Schema } from "mongoose";

export interface IProject {
  name: string;
  email: string;
  service: string;
  description: string;
  fileUrl?: string;
  status: "pending" | "in-progress" | "completed";
  userEmail: string;
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    service: { type: String, required: true },
    description: { type: String, required: true },
    fileUrl: { type: String },
    status: { type: String, default: "pending", enum: ["pending", "in-progress", "completed"] },
    userEmail: { type: String, required: true },
  },
  { timestamps: true }
);

export const Project: Model<IProject> =
  models.Project ?? mongoose.model<IProject>("Project", ProjectSchema);
