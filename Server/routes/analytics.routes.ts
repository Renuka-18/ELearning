import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { getCourseAnalytics, getOrderAnalytics, getUserAnalytics } from "../controllers/analytics.controllers";

const analyticRouter = express.Router();
analyticRouter.get("/get-user-analytic", isAuthenticated, authorizeRoles("admin"), getUserAnalytics) 
analyticRouter.get("/get-course-analytic", isAuthenticated, authorizeRoles("admin"), getCourseAnalytics) 
analyticRouter.get("/get-order-analytic", isAuthenticated, authorizeRoles("admin"), getOrderAnalytics) 



export default analyticRouter;