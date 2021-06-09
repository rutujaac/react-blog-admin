import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router'

const PostDetails = () => {
    const [postDetails, setPostDetails] = useState({});
    const [comments, setComments] = useState([]);
    const context = useContext(UserContext)
    const history = useHistory();
    const { id } = useParams();

    useEffect(async () => {
        await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            headers: {
              'Authorization': `token ${context.user.token}`
            }
          })
        .then(result => {
            setPostDetails(result.data);
        })
        .catch(error => {
            console.error(error);
        })

        await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`, {
            headers: {
              'Authorization': `token ${context.user.token}`
            }
          })
        .then(result => {
            setComments(result.data);
            console.log(comments);
        })
    },[])

    return (
        <div>
            <div className={context.user.darkMode ? "card dark-mode" : "card"}>
            <div className={context.user.darkMode ? "card card1 card2 dark-mode" : "card card1 card2"}>
                    <div className="card-body card1">
                    <h6 className="card-subtitle mb-2 text-muted">Post ID: {postDetails.id}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">User ID: {postDetails.userId}</h6>
                    <h5 className="card-subtitle">{postDetails.title}</h5>
                    <p className="card-text">{postDetails.body}</p>
                    </div>
                    </div>
                    <div className="comment-widgets">
                    <h4 className="card-title">Comments</h4>
            {comments.map((comment, key) => {
                return (
                        <div className="d-flex card1 card2 border ">
                            <div className="p-2"><img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583336/AAA/4.jpg" alt="user" width="60" className="rounded-circle" /></div>
                            <div className={context.user.darkMode ? "comment-text dark-mode" : "comment-text"}>
                                <h6 className="font-medium user-details">{comment.name}</h6> 
                                <span className="m-b-15 d-block user-details">{comment.body}</span>
                                <span className="m-b-15 d-block user-details">{comment.email}</span>
                            </div>
                        </div>
                )
            })}
             </div>
        </div>
        </div>
    )
}

export default PostDetails
