"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// import {fetchUsersData} from '../utils/utils';
// import dotenv from 'dotenv';
// import { findAllData, User } from '../models/models';
const userModel_1 = __importDefault(require("../models/userModel"));
// const dotEnv = dotenv.config()
// const secret = process.env.JWT_SECRET as string
// import { IGetUserAuthInfoRequest } from "../request";
// interface jwtPayLoad {
//     id: string;
//   }
// //   import express, { req: Request, res: Response, next: NextFunction } from "express";
//   import httpStatus from "http-status";
// //   import jwt from "jsonwebtoken";
// //   const secret = process.env.JWT_SECRET as string;
//   export async function isLoggedIn (
//     req: Request | JwtPayload,
//     res: Response,
//     next: NextFunction
//   ) {
//     try {
//       const token = req.headers.token;
//       if (!token) {
//         res.status(httpStatus.UNAUTHORIZED).json({
//           Error: "Kindly sign in as a Doctor",
//         });
//         return;
//       }
//       let verified = jwt.verify(token, process.env.APP_SECRET as string);
//       if (!verified) {
//         return res
//           .status(httpStatus.UNAUTHORIZED)
//           .json({ Error: "Doctor not verify, you can access this route" });
//       }
//         const {_id} = verified as {[key:string]:string}
//   //find user by id
//   const user = (await User.findById(_id)) 
//     if(!user)  {
//       return res.status(401).json({
//           Error: "Invalid Credentials"
//       })
//     }
//   req.user = verified as {[key:string]:string}
//   next()
//       next();
//     } catch (error) {
//       return res
//         .status(httpStatus.FORBIDDEN)
//         .json({ Error: "Doctor is not not logged in" });
//     }
//   }
// export const isLoggedIn = async(req: JwtPayload, res:Response, next:NextFunction) => {
//     try { const authorization = req.headers.authorization
//       if(!authorization) {
//           return res.status(401).json({
//               Error: "Kindly signin as a user"
//           })
//       };
//       const token = authorization.slice(7, authorization.length)
//       let verified = jwt.verify(token, process.env.APP_SECRET!)
//   if(!verified) {
//       return res.status(401).json({
//           Error: "unauthorised"
//       })
//   };
//   const {_id} = verified as {[key:string]:string}
//   //find user by id
//   const user = (await User.findById(_id)) 
//     if(!user)  {
//       return res.status(401).json({
//           Error: "Invalid Credentials"
//       })
//     }
//   req.user = verified as {[key:string]:string}
//   next()
//   } catch (err) {
//       return res.status(401).json({
//           Error: "Unauthorized"
//       })
//   }
//   };
exports.isLoggedIn = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.cookies.token) {
        try {
            token = req.cookies.token;
            if (process.env.APP_SECRET) {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.APP_SECRET);
                // const allData = await findAllData()
                if (typeof (decoded) !== 'string') {
                    req.user = userModel_1.default.find({ id: decoded.id });
                }
                next();
            }
        }
        catch (error) {
            console.error(error);
            res.status(404);
            throw new Error('Not authorized, token failed');
        }
    }
    else if (((req.headers.authorization !== undefined) && (req.headers.authorization.startsWith('Bearer')))) {
        try {
            token = req.headers.authorization.split('Bearer ')[1];
            if (process.env.JWT_SECRET) {
                token = req.cookies.token;
                if (process.env.APP_SECRET) {
                    const decoded = jsonwebtoken_1.default.verify(token, process.env.APP_SECRET);
                    // const allData = await findAllData()
                    if (typeof (decoded) !== 'string') {
                        req.user = userModel_1.default.find({ id: decoded.id });
                    }
                    next();
                }
            }
        }
        catch (error) {
            res.status(404);
            throw new Error('Not authorized, token failed');
        }
    }
    if (!token) {
        res.status(401);
        res.redirect('/login');
        // throw new Error('Not authorized, no token');
    }
}));
//# sourceMappingURL=authMiddleware.js.map