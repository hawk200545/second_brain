import mongoose, { Schema, Document } from "mongoose";
import { mongo_url } from "../config/config";

// User Interface
interface IUser extends Document {
  username: string;
  password: string;
}

// Content Interface
interface IContent extends Document {
  link: string;
  type: string;
  title: string;
  tags?: string[];
  userId: mongoose.Types.ObjectId;
  body?: Record<string, any>;
  created_at: Date;
}
// Link Interface
interface ILink extends Document {
  hash: string;
  userId: mongoose.Types.ObjectId;
}

// User Schema
const UserSchema = new Schema<IUser>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// Content Schema [Updated to suite the Card compenent]
// TODO : Delete the old Schema in the db
const ContentSchema = new Schema<IContent>({
  link: { type: String }, 
  type: {
    type: String,
    enum: ["Tweet", "Document", "Video"], 
    required: true,
  },
  title: { type: String, required: true },
  tags: { type: [String] },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  body: {
    title: { type: String },
    paragraph: { type: String },
    points: [{ type: String }],
  },
  created_at: { type: Date, default: Date.now },
});

// Link Schema
const LinkSchema = new Schema<ILink>({
  hash: { type: String, unique: true, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

// Exports
const UserModel = mongoose.model<IUser>("User", UserSchema);
const ContentModel = mongoose.model<IContent>("Content", ContentSchema);
const LinkModel = mongoose.model<ILink>("Link", LinkSchema);

// TODO : Should export this function as well
// Should use this function @index.ts
export async function connectDB() {
  try {
    if (!mongo_url) throw new Error("MONGO_URL is not defined in .env");

    await mongoose.connect(mongo_url);
    console.log("Connected to database");
  } catch (err) {
    console.error("Database connection failed", err);
    process.exit(1);
  }
}

export { UserModel, ContentModel, LinkModel };
