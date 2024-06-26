
require('dotenv').config();
import express,{NextFunction, Request, Response} from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import {ErrorMiddleware} from "./middleware/error";
import userRouter from "./routes/user.routes";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRoute from "./routes/notification.route";
import analyticRouter from "./routes/analytics.routes";
import layoutRouter from "./routes/layout.routes";



app.use(express.json({limit: "50mb"}));

app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials:true,
})
);

app.use("/api/v1",userRouter);
app.use("/api/v1",courseRouter);
app.use("/api/v1",orderRouter);
app.use("/api/v1",notificationRoute);
app.use("/api/v1", analyticRouter);
app.use("/api/v1", layoutRouter);

app.get("/test",(req:Request,res:Response,next:NextFunction) =>{
    res.status(200).json({
        success:true,
        message:"Api is working",
    });
});

app.all("*",(req:Request,res:Response,next:NextFunction) =>{
    const err = new Error (`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
})


app.use(ErrorMiddleware);