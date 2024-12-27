import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    typeof: String,
    required: true,
  },
  description: {
    typeof: String,
    required: true,
  },
  requirements: {
    typeof: String,
  },
  salary: {
    typeof: Number,
    required: true,
  },
  location: {
    typeof: Number,
    required: true,
  },
  jobType: {
    typeof: Number,
    required: true,
  },
  position: {
    typeof: Number,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  applications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
  ],
},{ timestamps: true });

export const Job = mongoose.model("Job", jobSchema);
