import { Thread } from "../models/thread.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createThread = asyncHandler(async (req, res) => {
  const { content, image } = req.body;
  const author = req.user?._id;

  if (!content) {
    throw new ApiError(400, "Thread must have content to post !!");
  }

  const thread = await Thread.create({
    content,
    image,
    author,
  });

  console.log(thread);

  return res
    .status(200)
    .json(new ApiResponse(200, thread, "Content uploaded successfully !! "));
});

const updateThread = asyncHandler(async (req, res) => {
  const { threadId } = req.params;
  const { content, image } = req.body;
  const { owner } = req.user?._id;

  if (!threadId) {
    throw new ApiError(400, "Thread is not exist !");
  }

  const updatedThread = await Thread.findByIdAndUpdate(
    threadId ,
    {
      content,
      image,
      owner,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedThread, "Thread updated successfully !"));
});

const deleteThread = asyncHandler(async (req, res) => {
  const { threadId } = req.params;

  if (!threadId) {
    throw new ApiError(400, "Thread is not exist !");
  }

  const deletedThread = await Thread.findByIdAndDelete( threadId );

  return res
    .status(200)
    .json(new ApiResponse(200, deletedThread, "Thread deleted successfully!"));
});

const getAllThreads = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
    //TODO: get all videos based on query, sort, pagination
    // get current user
    // search video document from current user and return that
    const author = req.user?._id;
  
    const threads = await Thread.find({ author });
    if (!threads) {
      throw new ApiError(400, "Videos are not found !");
    }
  
    console.log(threads);
    return res
      .status(200)
      .json(new ApiResponse(200, threads, "All videos are fetched!!"));
  });

export { createThread, updateThread, deleteThread, getAllThreads };
