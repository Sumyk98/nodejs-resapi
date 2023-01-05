import { Router } from "express";
import {
  getEmpleados,
  createEmpleados,
  updateEmpleados,
  deleteEmpleados,
  getEmpleado
} from "../controllers/empleados.controller.js";
const router = Router();

router.get("/empleados", getEmpleados);

router.get("/empleados/:id", getEmpleado);

router.post("/empleados", createEmpleados);

router.patch("/empleados/:id", updateEmpleados);

router.delete("/empleados/:id", deleteEmpleados);

export default router;
