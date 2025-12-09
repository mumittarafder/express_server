import { pool } from "../../config/db";
import express, { Request, Response } from "express";
import { userServices } from "./user.service";


const createUser = async (req: Request, res: Response) => {

  try {
    const result = await userServices.createUserIntoDB(req.body)
    // console.log(result.rows[0]);

    // res.send({ message: "data inserted" })

    res.status(201).json({
      success: 201,
      message: "data inserted successfully",
      data: result.rows[0]
    })

  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }

};

const getAllUser = async(req: Request, res: Response) => {
    const result = await userServices.getUserFromDB();
  try{

    res.status(200).json({
      success: true,
      message: "users retrieved successfully",
      data: result.rows
    })

  }catch(err: any){
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    })
  }
};

const getSingleUser = async (req:Request, res:Response) => {
  try{
        const result = await userServices.getSingleUserFromDB(req.params.id!);

        // getSingleUserFromDB(req.params.id as string);
    
        // console.log(result.rows);
    
        if(result.rows.length === 0){
          res.status(404).json({
          success: false,
          message: "users not found",
          })
        }else{
          res.status(200).json({
            success: true,
            message: "users fetched successfully",
            data: result.rows[0]
          })
        }
    
        }catch(err: any){
        res.status(500).json({
          success: false,
          message: err.message,
          details: err
        })
      }
};

const updateUser = async(req: Request, res: Response) => {
    const result = await userServices.updateUserInDB(req.body.name, req.body.email, req.params.id!);
    try{
         if(result.rows.length === 0){
      res.status(404).json({
      success: false,
      message: "users not found",
      })
    }else{
      res.status(200).json({
        success: true,
        message: "users updated successfully",
        data: result.rows[0]
      })
    }

    }catch(err: any){
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    })
  }
};

const deleteUser = async(req: Request, res: Response) => {
    const result = await userServices.deleteUserFromDB(req.params.id!);

    try{

    // console.log(result);

    if(result.rowCount === 0){
      res.status(404).json({
      success: false,
      message: "users not found",
      })
    }else{
      res.status(200).json({
        success: true,
        message: "users deleted successfully",
        data: result.rows,
      })
    }

    }catch(err: any){
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    })
  }
};

export const userController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
}