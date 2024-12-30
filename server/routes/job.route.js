import express from "express";
import { getAbminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";
import isAunthenicated from "../middlewares/isAunthenticated.js";
const router = express.Router();

router.post("/register", isAunthenicated, postJob);
router.get("/all", isAunthenicated, getAllJobs);
router.get("/:id", isAunthenicated, getJobById);
router.get("/admin", isAunthenicated, getAbminJobs);

export default router;