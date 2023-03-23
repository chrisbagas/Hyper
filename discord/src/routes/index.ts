import { Router } from "express";
import discordRouter from "./discordRouter";

const router = Router()
router.use("/discord", discordRouter)

export default router;
