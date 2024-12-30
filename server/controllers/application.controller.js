import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({ message: "Job not found", success: false });
    }
    // check already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "Already applied", success: false });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    const application = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(application._id);
    await job.save();
    return res
      .status(201)
      .json({ message: "Applied successfully", application, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.id })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company", options: { sort: { createdAt: -1 } } },
      })
      .sort({ createdAt: -1 });
    if (!applications) {
      return res
        .status(404)
        .json({ message: "Applications not found", success: false });
    }
    return res.status(200).json({ applications, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      populate: { path: "applicant" },
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res
        .status(400)
        .json({ message: "Status is required", success: false });
    }
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res
        .status(404)
        .json({ message: "Application not found", success: false });
    }
    application.status = status.toLowerCase();
    await application.save();
    return res
      .status(200)
      .json({ message: "Application updated", application, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
