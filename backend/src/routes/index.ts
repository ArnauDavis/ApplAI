import { Router } from "express";
import profileRoutes from "./profileRoutes.ts";

const router = Router();

router.use("/profiles", profileRoutes);

export default router;