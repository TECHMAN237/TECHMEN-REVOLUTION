import mongoose, { Model, models, Schema } from "mongoose";

export interface IPortfolioItem {
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  createdAt: Date;
}

const PortfolioItemSchema = new Schema<IPortfolioItem>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

export const PortfolioItem: Model<IPortfolioItem> =
  models.PortfolioItem ??
  mongoose.model<IPortfolioItem>("PortfolioItem", PortfolioItemSchema);
