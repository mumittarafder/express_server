import { pool } from "../../config/db"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import config from "../../config/index";

const login = async(email: string, password: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);

    console.log(result);

    // if user email doesnt match
    if(result.rows.length === 0){
        return null;
    }
    const user = result.rows[0];

    const matchPass = await bcrypt.compare(password, user.password);
   
    console.log({user, matchPass});
    
    if(!matchPass){
        return false;
    };

    // const token = jwt.sign(payload, secret, {expiresIn: '1h'})

    const secret = config.jwtSecretKey;

    const token = jwt.sign({name: user.name, email: user.email, role: user.role}, config.jwtSecretKey as string, {expiresIn: '7d'});
    console.log({token});

    return {user, token};
}

export const authService = {
    login,
}