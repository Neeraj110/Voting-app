import { Router } from "express";
import {
  createCandidate,
  deleteCandidate,
  getAllCandidates,
  getCandidate,
  updateCandidate,
  voting,
  votingCount,
} from "../controllers/candidate.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = Router();

router.route("/voting-count").get(votingCount);
router.use(protect);
router.route("/create-candidate").post(protect, createCandidate);
router.route("/update-candidate/:candidateId").patch(protect, updateCandidate);
router.route("/delete-candidate/:candidateId").delete(protect, deleteCandidate);
router.route("/get-candidate/:candidateId").get(protect, getCandidate);
router.route("/getallcandidates").get(protect, getAllCandidates);
router.route("/voting/:candidateId").post(protect, voting);

export default router;
