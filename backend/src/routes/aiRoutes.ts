import { Router } from "express";

import { analyzeJobForProfile } from "../services/jobAnalysisService.ts";
import { generateCoverLetterForJob } from "../services/coverLetterService.ts";
import { generateCoverLetterPdf } from "../services/coverLetterPdfService.ts";
import { prisma } from "../lib/prisma.ts";

const router = Router();

// --------------------
// Job Analysis Route
// --------------------

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

// --------------------
// Cover Letter Generation Route
// --------------------

router.post(
  "/profiles/:profileId/jobs/:jobId/cover-letter",
  async (req, res, next) => {
    try {
      const { profileId, jobId } = req.params;

      const coverLetter =
        await generateCoverLetterForJob(
          profileId,
          jobId
        );

      res.json({ coverLetter });
    } catch (error) {
      next(error);
    }
  }
);

// --------------------
// Cover Letter PDF Route
// --------------------

router.get(
  "/profiles/:profileId/jobs/:jobId/cover-letter/pdf",
  async (req, res, next) => {
    try {
      const { profileId, jobId } = req.params;

      const job = await prisma.job.findFirst({
        where: {
          id: jobId,
          userProfileId: profileId,
        },
      });

      if (!job) {
        res.status(404).json({
          message: "Job not found",
        });
        return;
      }

      if (!job.coverLetter) {
        res.status(404).json({
          message:
            "No cover letter has been generated for this job",
        });
        return;
      }

      const document =
        generateCoverLetterPdf(job.coverLetter);

      const safeCompany = job.company
        .replace(/[^a-z0-9]/gi, "_")
        .replace(/_+/g, "_");

      const safeTitle = job.title
        .replace(/[^a-z0-9]/gi, "_")
        .replace(/_+/g, "_");

      const filename =
        `${safeCompany}_${safeTitle}_Cover_Letter.pdf`;

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}"`
      );

      document.pipe(res);
      document.end();
    } catch (error) {
      next(error);
    }
  }
);

export default router;