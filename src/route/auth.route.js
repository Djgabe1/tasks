import { Router } from "express";
import {login, logout, register, profile, verifyToken} from '../controllers/auth.controller.js'
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

/**
 * Registro
 */
router.post('/register',validateSchema(registerSchema), register);
/**
 * Login
 */
router.post('/login', validateSchema(loginSchema), login);
/**
 * Logout
*/
router.post('/logout', logout);
/**
 * Verify Token
  */
router.get('/verify', verifyToken);
/**
 * Profile
  */
router.get('/profile', authRequired, profile);
export default router; 