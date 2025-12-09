import express, { NextFunction, Request, Response } from 'express'
import config from "../src/config/index"
import initDB, { pool } from '../src/config/db'
import logger from './middleware/logger'
import { userRoutes } from './modules/user/user.route'
import { userController } from './modules/user/user.controller'
import { todoRoutes } from './modules/todo/todo.routes'
import { authRoutes } from './modules/auth/auth.routes'

const app = express()
const port = config.port;

// Parser
app.use(express.json()); // to PARSE json data
app.use(express.urlencoded()); //>>> This is for FORM DATA


// initializing DB
initDB();



// "/" >>> localhost:5000/
app.get('/', logger, (req: Request, res: Response) => {
  res.send('Hello Next Level Developers!')
});


// Users post route
//. "/" >>> localhost:5000/users
// create all users
app.use("/users", userRoutes);

// creare  all users using route middleware userController.createUser

// app.post("/users", async (req: Request, res: Response) => {
//   const { name, email } = req.body;

//   try {
//     const result = await pool.query(`INSERT INTO  users(name, email) VALUES($1, $2) RETURNING *`, [name, email]);

//     // console.log(result.rows[0]);

//     // res.send({ message: "data inserted" })

//     res.status(201).json({
//       success: 201,
//       message: "data inserted successfully",
//       data: result.rows[0]
//     })

//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message
//     })
//   }

// });


// get all users
// app.get("/users", async(req: Request, res: Response) => {

//   try{
//     const result = await pool.query(`SELECT * FROM users`);

//     res.status(200).json({
//       success: true,
//       message: "users retrieved successfully",
//       data: result.rows
//     })

//   }catch(err: any){
//     res.status(500).json({
//       success: false,
//       message: err.message,
//       details: err
//     })
//   }
// });


// get all users using route middleware userController.getAllUser
app.use("/users", userRoutes);


// get single user
app.get("/users/:id", userRoutes);


// update users using route middleware userController.updateUser
app.use("/users/:id", userRoutes)

// Delete
app.use("/users/:id", userRoutes)


// Todos CRUD
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Create todos
app.use("/todos", todoRoutes);

// Get all todos
app.use("/todos", todoRoutes)

// Get single todo
app.use("/todos/:id", todoRoutes);

// update todo
app.use("/todos/:id", todoRoutes);

// delete todo
app.use("/todos/:id", todoRoutes);



///>>>> Auth routes
app.use("/auth", authRoutes)

// Not found 
app.use((req, res) => {
  res.status(404).json({
    success: true,
    message: "Route not found",
    path: req.path
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
