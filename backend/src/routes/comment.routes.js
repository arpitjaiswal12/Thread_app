import Router from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addComment, deleteComment, getThreadComments, updateComment } from "../controllers/comment.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/add/:ThreadId").post(addComment);
router.route("/update/:commentId").put(updateComment);
router.route("/delete/:commentId").delete(deleteComment);
router.route("/getall/:threadId").get(getThreadComments);

export default router;