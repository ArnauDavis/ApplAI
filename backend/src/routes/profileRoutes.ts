import { Router } from "express";
import {
  getProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
  createExperience,
  getExperiences,
  updateExperience,
  deleteExperience,
} from "../services/profileService.ts";

const router = Router();

router.get("/", async (req, res) => {
  const profiles = await getProfiles();

  res.json(profiles);
});

router.get("/:id", async (req, res) => {
  const profile = await getProfileById(req.params.id);

  if (!profile) {
    res.status(404).json({
      message: "Profile not found",
    });
    return;
  }

  res.json(profile);
});

router.post("/", async (req, res) => {
  const profile = await createProfile(req.body);

  res.status(201).json(profile);
});

router.put("/:id", async (req, res) => {
  const profile = await updateProfile(
    req.params.id,
    req.body
  );

  if (!profile) {
    res.status(404).json({
      message: "Profile not found",
    });
    return;
  }

  res.json(profile);
});

router.delete("/:id", async (req, res) => {
  await deleteProfile(req.params.id);

  res.status(204).send();
});

router.post("/:profileId/experiences", async (req, res) => {
  const experience = await createExperience(
    req.params.profileId,
    req.body
  );

  res.status(201).json(experience);
});

router.get("/:profileId/experiences", async (req, res) => {
  const experiences = await getExperiences(
    req.params.profileId
  );

  res.json(experiences);
});

router.put("/experiences/:id", async (req, res) => {
  const experience = await updateExperience(
    req.params.id,
    req.body
  );

  res.json(experience);
});

router.delete("/experiences/:id", async (req, res) => {
  await deleteExperience(req.params.id);

  res.status(204).send();
});

export default router;