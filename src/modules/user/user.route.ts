import { pool } from "../../config/db";
import express, { Request, Response } from "express";
import { userController } from "../user/user.controller";
import auth from "../../middleware/auth";
import logger from "../../middleware/logger";

const router = express.Router();



// ----> routes -> controller -> service ->
 
//localhost:5000/users/
//app.user("users", userRoutes)

router.post("/", userController.createUser);
router.get("/", logger,  auth("admin"), userController.getAllUser)
router.get("/:id", userController.getSingleUser)
router.put("/:id", userController.updateUser)
router.delete("/:id", userController.deleteUser)



export const userRoutes = router;

