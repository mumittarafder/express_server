import { pool } from "../../config/db";


// create todo service functions

// Record < string, unknown> = {key = string : value: unknown}
const createTodoInDB = async(payload: Record<string, unknown>) => {
    const {user_id, title} = payload;
    const result = await pool.query(`INSERT INTO todos (user_id, title) VALUES($1, $2) RETURNING *`, [user_id, title]);
    return result;
};

const getTodosFromDB = async() => {
    const result = await pool.query(`SELECT * FROM todos`);
    return result;
};

const getSingleTodoFromDB = async(id: string) => {
    const result = await pool.query(`SELECT * FROM todos WHERE id = $1`, [id]);
    return result;
};

const updateTodoInDB = async(payload: Record<string, unknown>, id: string) => {
     const { title, completed } = payload;
    const result = await pool.query(`UPDATE todos SET title=$1, completed=$2 WHERE id=$3 RETURNING *`, [title, completed, id]);
    return result;
};

const deleteTodoFromDB = async(id: string) => {
    const result = await pool.query(`DELETE FROM todos WHERE id = $1`, [id]);
    return result;

};


export const todoServices = {
    createTodoInDB,
    getTodosFromDB,
    getSingleTodoFromDB,
    updateTodoInDB,
    deleteTodoFromDB,


}