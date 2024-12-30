import express from "express";
import {
    applyJob,
    getApplicants,
    getAppliedJobs,
    updateApplication
} from "../controllers/application.controller.js";
import isAunthenicated from "../middlewares/isAunthenticated.js";

const router = express.Router();

router.post("/apply/:id", isAunthenicated, applyJob);
router.get("/get", isAunthenicated, getAppliedJobs);
router.get("/:id/applicants", isAunthenicated, getApplicants);
router.post("/status/:id/update", isAunthenicated, updateApplication);

export default router;