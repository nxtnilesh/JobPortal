import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const company = await Company.findOne({ name: companyName });
    if (company) {
      return res
        .status(400)
        .json({ message: "Company already exists", success: false });
    }
    const newCompany = await Company.create({
      name: companyName,
      userId: req.id,
    });
    return res
      .status(201)
      .json({ message: "Company created", newCompany, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getCompany = async (req, res) => {
  try {
    const company = await Company.find({ userId: req.id });
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }
    return res.status(200).json({ company, success: true });
  } catch (error) {}
};

export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }
    return res.status(200).json({ company, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    const updateData = {
      name,
      description,
      website,
      location,
    };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Updated Successfully", company, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
