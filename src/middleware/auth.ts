// higher order function --> take function as parameter and return function

import { NextFunction, Request, Response, } from "express";
import jwt from "jsonwebtoken";
import config from "../config/index";

// roles = ["admin", "user", "guest"];
const auth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;

            console.log({ authToken: token });

            if (!token) {
                return res.status(500).json({ message: "you are not authorized to login" })
            };

            // if token is valid
            const decoded = jwt.verify(token, config.jwtSecretKey as string) as jwt.JwtPayload;
            console.log({ decoded });

            req.user = decoded ;

            // ["admin"]
            if(roles.length && !roles.includes(decoded.role)){
                return res.status(500).json({
                    error: "unauthorized access - role mismatch"
                })
            };

            next();
        } catch (err: any) {
            res.status(401).json({
                success: false,
                message: "unauthorized access",
                details: err.message
            })
        };
    }
};

export default auth;