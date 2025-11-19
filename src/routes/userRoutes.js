import { Router } from "express";
import { register } from "../controllers/userController.js";
import { login } from "../controllers/userController.js";
import { getProfile } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { createUserByAdmin } from "../controllers/userController.js";
import { getAllUsers } from "../controllers/userController.js";


const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get('/profile', verifyToken, getProfile);
router.post("/admin/create-user",createUserByAdmin);
router.get("/all",verifyAdmin, getAllUsers);

export default router;