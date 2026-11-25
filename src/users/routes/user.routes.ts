import { Router } from "express";

import { createUserController, getUserController } from "../controller/user.controller";
import { validateCreateUser } from "../validation/user.validation";


const router = Router();

router.get("/", getUserController);
router.post("/", validateCreateUser, createUserController);

export default router;