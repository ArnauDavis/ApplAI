import { Router } from "express";
import profileRoutes from "./profileRoutes.ts";
import aiRoutes from "./aiRoutes.ts";

const router = Router();

router.use("/profiles", profileRoutes);
router.use("/ai", aiRoutes);

export default router;