import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addComment = asyncHandler(async (req, res) => {
  const { ThreadId } = req.params;
  const currentUser = req.user?._id;
  const { content } = req.body;

  if (!ThreadId) {
    throw new ApiError(400, "Thread not found !");
  }

  if (!currentUser) {
    throw new ApiError(400, "User not found !");
  }

  const comment = await Comment.create({
    content,
    thread: ThreadId,
    owner: currentUser,
  });

  return res.json(
    200,
    new ApiResponse(200, comment, "Comment added successfully !")
  );
});

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  if (!commentId) {
    throw new ApiError(400, "Thread is not exist !");
  }

  const updatedcomment = await Comment.findByIdAndUpdate(commentId, {
    content,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedcomment, "Thread updated successfully !")
    );
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  if (!commentId) {
    throw new ApiError(400, "Thread is not exist !");
  }

  const deletedcomment = await Comment.findByIdAndDelete(commentId);

  return res
    .status(200)
    .json(new ApiResponse(200, deletedcomment, "Thread deleted successfully!"));
});

const getThreadComments = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
    //TODO: get all videos based on query, sort, pagination
    // get current user
    // search video document from current user and return that
    const {threadId}=req.params
  
    const comments = await Comment.find({threadId});
    if (!comments) {
      throw new ApiError(400, "comments are not found !");
    }
  
    console.log(comments);
    return res
      .status(200)
      .json(new ApiResponse(200, comments, "All videos are fetched!!"));
});

export { addComment, updateComment, deleteComment, getThreadComments };
