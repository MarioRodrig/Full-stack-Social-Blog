import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

function Post() {
  const { id } = useParams();  // Destructure id from useParams
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // useEffect to fetch post data based on id, with id as a dependency
  useEffect(() => {
    axios.get(`http://localhost:3001/Posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
  }, [id]);  // Dependency array should include 'id'

  // Fetch comments for the post
  useEffect(() => {
    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id]);

  const addComment = () => {
    axios
      .post("http://localhost:3001/comments", {
        commentBody: newComment,
        PostId: id,
      })
      .then((response) => {
        const commentToAdd = { commentBody: newComment };
        setComments([...comments, commentToAdd]);
        setNewComment("");  // Clear the comment input after submission
      });
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {postObject.title} </div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input 
            type="text" 
            placeholder="Comment..." 
            value={newComment}  // Bind input to newComment state
            onChange={(event) => setNewComment(event.target.value)} 
          />
          <button onClick={addComment}> Add Comment </button>  {/* Added onClick event */}
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment"> 
                {comment.commentBody} 
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
