import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["student", "recruiter"],
      default: "student",
    },
    profile: {
      bio: { typeof: String },
      skills: [{ typeof: String }],
      resume: { typeof: String }, //url of file
      resumeOriginalName: { typeof: String },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      profilePhoto: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);