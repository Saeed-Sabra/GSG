import { Router } from "express";
import { body } from "express-validator";
import { validateResultMiddleware } from "./validateResultMiddleware.js";

const calcRouter = Router();

calcRouter.post(
  "",
  [
    body("x").exists().isInt({ min: 1, max: 50 }),
    body("y").exists().isInt({ min: 1, max: 50 }),
    body("operation").exists().isIn(["+", "-", "*", "/"]),
  ],
  validateResultMiddleware,
  (req, res) => {
    const { x, y, operation } = req.body;
    let result = 0;
    if (operation === "+") {
      result = x + y;
    } else if (operation === "-") {
      result = x - y;
    } else if (operation === "*") {
      result = x * y;
    } else if (operation === "/") {
      result = x / y;
    } else {
      throw new Error("Invalid Operation");
    }

    res.status(200).json(result);
  }
);

export default calcRouter;
