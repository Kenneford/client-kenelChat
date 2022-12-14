import { useEffect, useState } from "react";
// import { Posts } from "../dummyData";
import Post from "../post/Post";
import Share from "../share/Share";
import "./Feed.css";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  console.log(posts);
  console.log(user);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get(`posts/timeline/${user._id}`);
      console.log(res);
      setPosts(
        res.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
        {/* <Post /> */}
      </div>
    </div>
  );
}
