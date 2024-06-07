import { Request, Response, NextFunction } from "express";
import Errorhandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncError";
import LayoutModel from "../models/layout.models";
import cloudinary from "cloudinary";

export const createLayout = catchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const {type} = req.body;

        const isTypeExist = await LayoutModel.findOne({type});
        if(isTypeExist){
            return next(new Errorhandler(`${type} already exist`,400))
        }
        if(type === "Banner"){
            const {image,title,subTitle} = req.body;
            const myCloud = await cloudinary.v2.uploader.upload(image,{
                folder:"layout"
            });

            const banner = {
                type:"Banner",
                banner:{
                image:{
                    public_id:myCloud.public_id,
                    url:myCloud.secuure_url
                },
                title,
                subTitle
            },
            };
            await LayoutModel.create(banner);
        };    

           

            if(type === "FAQ"){
                const{ faq } = req.body;
                const FaqItems = await Promise.all(faq.map(async(item:any)=>{
                    return {
                        question:item.question,
                        answer:item.answer
                    };
                })
            );
            await LayoutModel.create({type:"FAQ", faq:FaqItems});
            }
            
            if(type === "Categories"){
                const{categories} = req.body;
                const catItems = await Promise.all(categories.map(async(item:any)=>{
                    return {
                       
                        title:item.title
                    };
                })
            );
                await LayoutModel.create({type:"Categories", categories:catItems});
            }

            res.status(200).json({
                sucess:true,
                message:"Layout created Successfully"
            })
        
    }
    catch(error:any){
        return next(new Errorhandler(error.message, 500))
    }
})


export const editLayout = catchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const {type} = req.body;

        
        if(type === "Banner"){

            const bannerData:any = await LayoutModel.findOne({type:"Banner"});
            const {image,title,subTitle} = req.body;
           const data = image.startsWith("https")?
           bannerData : await cloudinary.v2.uploader.upload(image, {
                folder:"layout"
           });

            const banner = {
                type:"Banner",
                image:{

                    public_id:image.startsWith("https")? bannerData.banner.image.public_id :data?.public_id,
                     url: image.startsWith("https")? bannerData.banner.image.url :data?.secure_url,
                },
                title,
                subTitle
            };
            await LayoutModel.findByIdAndUpdate(bannerData._id,{banner});
        };    

           

            if(type === "FAQ"){
                const{ faq } = req.body;

                const faqItem = await LayoutModel.findOne({type:"FAQ"});
                
                const FaqItems = await Promise.all(faq.map(async(item:any)=>{
                    return {
                        question:item.question,
                        answer:item.answer
                    };
                })
            );
            await LayoutModel.findByIdAndUpdate(faqItem?._id,{type:"FAQ", faq:FaqItems});
            }
            
            if(type === "Categories"){
                const{categories} = req.body;
                const CaItem = await LayoutModel.findOne({type:"Categories"});

                const catItems = await Promise.all(categories.map(async(item:any)=>{
                    return {
                       
                        title:item.title
                    };
                })
            );
                await LayoutModel.findByIdAndUpdate(CaItem?._id,{type:"Categories", categories:catItems});
            }

            res.status(200).json({
                sucess:true,
                message:"Layout updated Successfully"
            })
        
    }
    catch(error:any){
        return next(new Errorhandler(error.message, 500))
    }
})

export const getLayoutByType = catchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const{type} = req.params;
        const layout = await LayoutModel.findOne({type});

        res.status(201).json({
            success:true,
            layout
        })
    }catch(error:any){
        return next(new Errorhandler(error.message, 500))
    }
})