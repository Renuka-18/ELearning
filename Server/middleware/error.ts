import { NextFunction, Request, Response} from "express";
import Errorhandler from "../utils/ErrorHandler";


export const ErrorMiddleware = (err:any, req:Request, res:Response, next:NextFunction) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    if(err.name === 'CastError'){
        const message = `Resource Not Found. Invalid :${err.path}`;
        err = new Errorhandler(message, 400);
    }

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new Errorhandler(message, 400);
    }

    if(err.name === 'JsonWebTokenError'){
        const message = `Json web token is invalid, try again`;
        err = new Errorhandler (message, 400);
    }

    if(err.name === 'TokenExpireError'){
        const message = `Json webtoken is expired, try again`;
        err = new Errorhandler(message, 400);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}