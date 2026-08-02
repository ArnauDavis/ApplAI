import { Router } from "express";

import {
  getProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
} from "../services/profileService.ts";

import {
  createExperience,
  getExperiences,
  updateExperience,
  deleteExperience,
} from "../services/experienceService.ts";

import {
  createEducation,
  getEducation,
  updateEducation,
  deleteEducation,
} from "../services/educationService.ts";

import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../services/projectService.ts";

const router = Router();


// --------------------
// Profile Routes
// --------------------

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


// --------------------
// Experience Routes
// --------------------

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


// --------------------
// Education Routes
// --------------------

router.post("/:profileId/education", async (req, res) => {
  const education = await createEducation(
    req.params.profileId,
    req.body
  );

  res.status(201).json(education);
});

router.get("/:profileId/education", async (req, res) => {
  const education = await getEducation(
    req.params.profileId
  );

  res.json(education);
});

router.put("/education/:id", async (req, res) => {
  const education = await updateEducation(
    req.params.id,
    req.body
  );

  res.json(education);
});

router.delete("/education/:id", async (req, res) => {
  await deleteEducation(req.params.id);

  res.status(204).send();
});


// --------------------
// Project Routes
// --------------------

router.post("/:profileId/projects", async (req, res) => {
  const project = await createProject(
    req.params.profileId,
    req.body
  );

  res.status(201).json(project);
});

router.get("/:profileId/projects", async (req, res) => {
  const projects = await getProjects(
    req.params.profileId
  );

  res.json(projects);
});

router.put("/projects/:id", async (req, res) => {
  const project = await updateProject(
    req.params.id,
    req.body
  );

  res.json(project);
});

router.delete("/projects/:id", async (req, res) => {
  await deleteProject(req.params.id);

  res.status(204).send();
});


export default router;