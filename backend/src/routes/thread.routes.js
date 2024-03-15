import Router from "express";

import { createThread, deleteThread, getAllThreads, updateThread } from "../controllers/thread.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/create").post(createThread);
router.route("/update/:threadId").put(updateThread);
router.route("/delete/:threadId").delete(deleteThread);
router.route("/getall").get(getAllThreads);


export default router;