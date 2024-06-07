import { Request, Response, NextFunction } from "express";
import Errorhandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncError";
import { generateLast12MOnthsData } from "../utils/analytics.generator";
import userModel from "../models/user.models";
import CourseModel from "../models/course.models";
import OrderModel from "../models/order.model";

export const getUserAnalytics = catchAsyncError(async( req:Request,res:Response, next:NextFunction) => {
    try{
        const users = await generateLast12MOnthsData(userModel);
        res.status(200).json({
            success:true,
            users,
        })

    }catch(error:any){
        return next (new Errorhandler(error.message,500));
    }
}) 

export const getCourseAnalytics = catchAsyncError(async( req:Request,res:Response, next:NextFunction) => {
    try{
        const courses = await generateLast12MOnthsData(CourseModel);
        res.status(200).json({
            success:true,
            courses,
        })

    }catch(error:any){
        return next (new Errorhandler(error.message,500));
    }
})


export const getOrderAnalytics = catchAsyncError(async( req:Request,res:Response, next:NextFunction) => {
    try{
        const orders = await generateLast12MOnthsData(OrderModel);
        res.status(200).json({
            success:true,
            orders,
        })

    }catch(error:any){
        return next (new Errorhandler(error.message,500));
    }
})