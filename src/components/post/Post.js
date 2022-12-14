import "./Post.css";
import { MoreVert } from "@mui/icons-material";
// import { Users } from "../dummyData";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  console.log(post);
  // const [like, setLike] = useState(post.like); //PREVIOUS
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      // console.log(res);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put(`/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                //   src="/assets/profileImg/prfImg1.jpg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                // src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
                alt=""
              />
            </Link>
            <span className="postUsername">
              {/* Kenneford Annan */}
              {user.username}
              {/* {Users.filter((u) => u.id === post?.userId)[0].username} */}
            </span>
            {/* <span className="postDate">12 mins ago</span> */}
            <span className="postDate">{format(post.createdAt)}</span>
            {/* <span className="postDate">{post.date}</span> */}
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          {/* <span className="postText">It's me</span> */}
          <span className="postText">{post?.desc}</span>
          {/* <img
            className="postImg"
            src="/assets/profileImg/prfImg1.jpg"
            alt=""
          /> */}
          {/* <img className="postImg" src={post.photo} alt="" /> */}
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              // src="assets/like.png"
              src={`${PF}like.png`}
              //   onClick=""
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              // src="assets/heart.png"
              src={`${PF}heart.png`}
              //   onClick=""
              onClick={likeHandler}
              alt=""
            />
            {/* <span className="postLikeCounter">5 people like it</span> */}
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            {/* <span className="postCommentText">6 comments</span> */}
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
