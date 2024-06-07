import express  from "express";
import { addAnswer, addQuestion, addReplytoReview, addReview, deleteCourse, editCourse, generateVideoUrl, getAdminAllCourses, getAllCourses, getCourseByUSer, getSingleCourse, updloadCourse } from "../controllers/course.controllers";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
//import { updateAccessToken } from "../controllers/user.controllers";
const courseRouter = express.Router();

courseRouter.post("/create-course",isAuthenticated,authorizeRoles("admin"), updloadCourse);
courseRouter.put("/update-course/:id",isAuthenticated,authorizeRoles("admin"), editCourse);
courseRouter.get("/get-course/:id", getSingleCourse);
courseRouter.get("/get-courses/", getAllCourses);
courseRouter.get("/get-course-content/:id",isAuthenticated, getCourseByUSer);
courseRouter.put("/add-question/",isAuthenticated, addQuestion);
courseRouter.put("/add-answer/",isAuthenticated, addAnswer);
courseRouter.put("/add-review/:id",isAuthenticated, addReview);
courseRouter.put("/add-reply/",isAuthenticated,authorizeRoles("admin"), addReplytoReview);
courseRouter.get("/get-courses/",isAuthenticated,authorizeRoles("admin"), getAllCourses);
courseRouter.delete("/delete-courses/:id",isAuthenticated,authorizeRoles("admin"), deleteCourse);
courseRouter.post("/getVdoCipherOTP", generateVideoUrl);
courseRouter.get("/get-admin-courses",isAuthenticated,authorizeRoles("admin"),getAdminAllCourses)






export default courseRouter;