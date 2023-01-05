import { json } from "express";
import { pool } from "../db.js";

export const getEmpleados = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM empleado");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Algo salio mal",
    });
  }
};

export const getEmpleado = async (req, res) => {
  try {
    console.log(req.params.id);
    const [rows] = await pool.query("SELECT *FROM empleado WHERE id = ?", [
      req.params.id,
    ]);
    console.log(rows);
    if (rows.length <= 0)
      return res.status(404).json({
        mensaje: "Empleado no encontrado",
      });
    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Algo salio mal",
    });
  }
};

export const createEmpleados = async (req, res) => {
  try {
    const { name, salario } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO empleado (name,salario) VALUES (?,?)",
      [name, salario]
    );
    res.send({
      id: rows.insertId,
      name,
      salario,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Algo salio mal",
    });
  }
};

export const deleteEmpleados = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM empleado WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows <= 0)
      return res.status(404).json({
        mensaje: "Empleado no encontrado",
      });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Algo salio mal",
    });
  }
};

export const updateEmpleados = async (req, res) => {
  const { id } = req.params;
  const { name, salario } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE empleado SET name = IFNULL(?,name), salario = IFNULL(?,salario) WHERE id = ?",
      [name, salario, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({
        mensaje: "Empleado no encontrado",
      });

    const [rows] = await pool.query("SELECT *FROM empleado WHERE id = ?", [id]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Algo salio mal",
    });
  }
};
