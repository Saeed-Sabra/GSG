import { Router } from "express";
import { body } from "express-validator";
import { validateResultMiddleware } from "./validateResultMiddleware.js";

const calcRouter = Router();

calcRouter.post(
  "",
  [
    body("x").exists().isInt({ min: 1, max: 50 }),
    body("y").exists().isInt({ min: 1, max: 50 }),
    body("operation").exists().isIn(["+"]),
  ],
  validateResultMiddleware,
  (req, res) => {
    const { x, y, operation } = req.body;

    let result = x + y;

    res.status(201).json(result);
  }
);

export default calcRouter;
