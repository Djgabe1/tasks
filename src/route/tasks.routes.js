import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { createTaskSchema } from "../schemas/task.schema.js";
//Controller
import { getTask, getTasks, createTask, updateTask, deleteTask } from "../controllers/tasks.controller.js";

const router = Router();
/**
 * Obtener todas las tareas
*/
router.get('/tasks', authRequired, getTasks);
/**
 * Obtener una sola tarea
*/
router.get('/tasks/:id', authRequired, getTask);
/**
 * Crear una tarea
*/
router.post('/tasks', authRequired,validateSchema(createTaskSchema), createTask);
/**
 * Eliminar tarea
*/
router.delete('/tasks/:id', authRequired, deleteTask );
/**
 * Modificar ntarea
*/
router.put('/tasks/:id', authRequired, updateTask );

export default router