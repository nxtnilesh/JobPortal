import mongoose from "mongoose";
const companySchema = new mongoose.Schema(
  {
    name: {
      typeof: String,
      required: true,
    },
    description: {
      typeof: String,
      required: true,
    },
    website: {
      typeof: String,
    },
    location: {
      typeof: String,
    },
    logo: {
      typeof: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const Company = mongoose.model("Company", companySchema);
