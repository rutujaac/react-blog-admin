import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router'
import avatar from '../images/avatar.png'

const Posts = () => {
    const { id } = useParams();
    const context = useContext(UserContext)
    const history = useHistory();
    const [post, setPost] = useState([]);

    useEffect(async () => {
        const data = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`, {
            headers: {
              'Authorization': `token ${context.user.token}`
            }
          })
        .then(result => {
            console.log(result.data);
            setPost(result.data);
        })
        .catch(error => console.error(error));
    }, [])


    return (
        <div>
            {post.map(item => {
                return (
                    <div className={context.user.darkMode ? "card card1 card2 dark-mode" : "card card1 card2" } >
                    <div className="card-body card1">
                    <h6 className="card-subtitle mb-2 text-muted">User ID: {item.userId}</h6>
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.body}</p>
                    <button class="btn btn-primary" onClick={() => {
                        history.push({
                            pathname: `/post-details/${item.id}`,
                            state: { id: item.id}
                        })
                    }}>View post</button>
                    </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Posts
