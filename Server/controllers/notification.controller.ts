import NotificationModel from "../models/notificationModel";
import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import Errorhandler from "../utils/ErrorHandler";
import cron from "node-cron";

export const getNotifications = catchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const notifications = await NotificationModel.find().sort({createdAt: -1});
        res.status(201).json({
            success:true,
            notifications,
        })
    }
    catch(error:any){
        return next (new Errorhandler(error.message, 400));
    }
});


export const updateNotification = catchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const notification = await NotificationModel.findById(req.params.id);
        if(!notification){
            return next (new Errorhandler ("Notification not found",400));
        }else{
            notification.status ? (notification.status="read"):notification?.status;
        }
        await notification.save();
        const notifications = await NotificationModel.find().sort({
            createdAt: -1,
        });
        res.status(201).json({
            success:true,
            notifications,
        });
    }catch(error:any){
        return next (new Errorhandler(error.message, 400));
    }
})

cron.schedule("0 0 0 * * * ",async() =>{
    const thirtyDaysAgo = new Date(Date.now() - 30 * 2)
    await NotificationModel.deleteMany({status:"read", createdAt:{$lt:thirtyDaysAgo}})
    console.log("Deleted read successfully")
})