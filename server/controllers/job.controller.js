import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      position,
      experienceLevel,
      companyId,
      
    } = req.body;
    if (
      !title ||
      !description ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !companyId ||
      !requirements
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const newJob = await Job.create({
      title,
      description,
      requirements: requirements.split(",") || "",
      salary,
      experienceLevel,
      location,
      jobType,
      position,
      company: companyId,
      createdBy: req.id,
    });
    return res
      .status(201)
      .json({ message: "Job created", newJob, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res
        .status(404)
        .json({ message: "Jobs not found", success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
    // .populate({
    //   path: "applications",
    // });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getAbminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    console.log(adminId);
    
    const jobs = await Job.find({ createdBy: adminId })
    //   .populate({ path: "company" })
      .sort({
        createdAt: -1,
      });
    if (!jobs) {
      return res
        .status(404)
        .json({ message: "Jobs not found", success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message,success: false });
  }
};
