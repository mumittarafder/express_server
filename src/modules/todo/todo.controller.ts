import { Request, Response } from "express";
import { todoServices } from "../todo/todo.service";

// create todo controller functions


const createTodo = async(req: Request, res: Response) => {

  try{
    const result = await todoServices.createTodoInDB(req.body);
              
    res.status(200).json({
      success: true,
      message: "Todo Created",
      data: result.rows[0],
    })
  }catch(err: any){
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
};

const getTodos = async(req: Request, res: Response) => {

  try{
    const result = await todoServices.getTodosFromDB();

    res.status(200).json({
      success: true,
      message: "todos retrieved successfully",
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

const getSingleTodo= async (req:Request, res:Response) => {
  try{
        const result = await todoServices.getSingleTodoFromDB(req.params.id!);

        // getSingleTodo(req.params.id as string) same as req.params.id! --> both are correct;
    
        // console.log(result.rows);
    
        if(result.rows.length === 0){
          res.status(404).json({
          success: false,
          message: "users not found",
          })
        }else{
          res.status(200).json({
            success: true,
            message: "todo fetched successfully",
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

const updateTodo = async(req: Request, res: Response) => {
  
  try{
    const result = await todoServices.updateTodoInDB(req.body, req.params.id!);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);

    }catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update todo" });
  }
};

const deleteTodo = async(req: Request, res: Response) => {
  // console.log(req.params.id);  
  
  try{
    const result = await todoServices.deleteTodoFromDB(req.params.id as string);

    console.log(result);

    if(result.rowCount === 0){
      res.status(404).json({
      success: false,
      message: "todos not found",
      })
    }else{
      res.status(200).json({
        success: true,
        message: "todos deleted successfully",
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

 
export const todoController = {
    createTodo,
    getTodos,
    getSingleTodo,
    updateTodo,
    deleteTodo,

};