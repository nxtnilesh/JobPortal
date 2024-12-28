import express from "express";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";
import isAunthenicated from "../middlewares/isAunthenticated.js";

const router = express.Router();

router.post("/register", isAunthenicated, registerCompany);
router.get("/get", isAunthenicated, getCompany);
router.get("/get/:id", isAunthenicated, getCompanyById);
router.put("/update/:id", isAunthenicated, updateCompany);

export default router;
