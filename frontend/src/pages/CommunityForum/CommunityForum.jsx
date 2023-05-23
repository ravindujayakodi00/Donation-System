import React, { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import Post from "./Post";

const Community = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="community mt-2">
      <CreatePost />
      {[...posts].reverse().map((post) => (
        <Post key={post._id} postId={post._id} post={post} />
      ))}
    </div>
  );
};

export default Community;
