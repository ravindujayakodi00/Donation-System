import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BsHeart,
  BsChat,
  BsThreeDots,
  BsHeartFill,
  BsChatFill,
} from "react-icons/bs";
import { MdIosShare } from "react-icons/md";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CommentSection from "./CommentSection";

const Post = ({ post }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [reloadBackdropOpen, setReloadBackdropOpen] = useState(false);
  const [likesCount, setLikesCount] = useState(
    isNaN(post.likesCount) ? 0 : post.likesCount
  );
  const [liked, setLiked] = useState(false);
  const [commentCount, setCommentCount] = useState(post.commentIds.length);
  const [commented, setCommented] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    setCommentCount(post.commentIds.length);
  }, [post.commentIds]);

  useEffect(() => {
    const image = new Image();
    image.src = post.postImageUrl;
    image.onload = () => {
      setImageLoading(false);
    };
  }, [post.postImageUrl]);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikesCount(likesCount + 1);
    } else {
      setLiked(false);
      setLikesCount(likesCount - 1);
    }
  };

  const handleComment = () => {
    if (!commented) {
      setCommented(true);
      setCommentCount(commentCount + 1);
    } else {
      setCommented(false);
      setCommentCount(commentCount - 1);
    }
  };

  const handleDeletePost = async () => {
  
    try {
      const response = await fetch(
        `http://localhost:8000/api/posts/${post._id}`,
        {
          method: "DELETE",
        }
      );
  
      if (response.ok) {
        console.log("Post deleted successfully!");
        // Perform any necessary UI updates after successful deletion
        // Refresh page
        window.location.reload();
      } else {
        console.log(`Failed to delete post. Status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="post mt-4 rounded-xl bg-slate-100 mx-60">
      <div className="flex justify-between">
        <div className="flex">
          <div>
            <h1 className="ml-4 mt-3">Maneesha Nilumindha</h1>
            <p className="ml-4 mt-1/2 text-xs text-gray-400">
              {new Date(post.createdDate).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={handleDropdownToggle}
            className="flex items-center focus:outline-none"
          >
            <BsThreeDots className="mt-4 mr-4 text-gray-500 text-xl" />
          </button>
          {dropdownOpen && (
            <div className="absolute top-0 right-0 mt-12 mr-10 w-48 bg-white rounded-lg shadow-lg z-10 opacity-70">
              <Link
                to={`/update/${post._id}`}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 hover:rounded-lg text-center hover:text-gray-900"
              >
                Edit Post
              </Link>
              <button
                onClick={() => setDeleteDialogOpen(true)}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-400 hover:rounded-lg hover:text-gray-900"
              >
                Delete Post
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        <img
          className="mt-4 rounded-sm"
          src={post.postImageUrl}
          alt="Post Image"
        />

        {imageLoading && (
          <div className="flex justify-center items-center h-full">
            <CircularProgress />
          </div>
        )}
      </div>
      <div>
        <p className="mt-4 ml-4 text-sm text-gray-700">
          {post.postCaption}
        </p>
      </div>

      <div className="flex justify-between">
        <div className="flex">
          <button onClick={handleLike} className="flex items-center">
            {liked ? (
              <BsHeartFill className="mt-4 ml-4 text-red-500 text-xl" />
            ) : (
              <BsHeart className="mt-4 ml-4 text-red-500 stroke-current font-bold text-xl" />
            )}
            <span className="ml-2 mt-4 text-gray-500 ">
              {likesCount}
            </span>
          </button>
          <button onClick={handleComment} className="flex items-center ml-4">
            <BsChat className="mt-4 ml-2 text-purple-500 stroke-current text-xl" />
            <span className="ml-2 mt-4 text-gray-500 ">
              {commentCount}
            </span>
          </button>

          <button className="flex items-center ml-4">
            <MdIosShare className="mt-3 ml-2 text-gray-500 stroke-current text-2xl " />
          </button>
        </div>
      </div>

      <CommentSection post={post} />

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="text-center text-blue-900 dialog-text"
        >
          {"Are you sure you want to delete this post?"}
        </DialogTitle>
        <DialogActions>
          <button
            className="mt-2 mr-1 bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => setDeleteDialogOpen(false)}
          >
            Cancel
          </button>
          <button
            className="mt-2 mr-4 bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
            onClick={handleDeletePost}
            autoFocus
          >
            Delete
          </button>
        </DialogActions>
      </Dialog>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={deleteLoading || reloadBackdropOpen}
        onClick={() => {}}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Post;
