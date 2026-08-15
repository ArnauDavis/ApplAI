import { Router } from "express";
import { analyzeJobForProfile } from "../services/jobAnalysisService.ts";

const router = Router();

router.post(
  "/profiles/:profileId/jobs/:jobId/analyze",
  async (req, res, next) => {
    try {
      const { profileId, jobId } = req.params;

      const result = await analyzeJobForProfile(
        profileId,
        jobId
      );

      res.json({ result });
    } catch (error) {
      next(error);
    }
  }
);

export default router;