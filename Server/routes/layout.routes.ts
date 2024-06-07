import express from 'express';
import { isAuthenticated, authorizeRoles } from '../middleware/auth';
import { createLayout, editLayout, getLayoutByType } from '../controllers/layout.controllers';
import { updateAccessToken } from '../controllers/user.controllers';

const layoutRouter = express.Router();

layoutRouter.post("/create-the-layout",isAuthenticated, authorizeRoles("admin"), createLayout)
layoutRouter.put("/edit-the-layout",isAuthenticated, authorizeRoles("admin"), editLayout)
layoutRouter.get("/get-layout/:type", getLayoutByType)



export default layoutRouter;