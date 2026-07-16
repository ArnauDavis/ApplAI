import { Router } from "express";
import {
  getProfiles,
  createProfile,
} from "../services/profileService.ts";

const router = Router();

router.get("/", async (req, res) => {
  const profiles = await getProfiles();

  res.json(profiles);
});

router.post("/", async (req, res) => {
  const profile = await createProfile(req.body);

  res.status(201).json(profile);
});

export default router;