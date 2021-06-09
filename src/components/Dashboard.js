import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router'
import { UserContext } from '../context/UserContext'

const Dashboard = () => {
    const context = useContext(UserContext)
    const [user, setUser] = useState([]);
    const history = useHistory();
    useEffect(async() => {
        await axios.get("https://jsonplaceholder.typicode.com/users", {
            headers: {
              'Authorization': `token ${context.user.token}`
            }
          })
        .then(result => {
            setUser(result.data);
            console.log(user)
        })
        .catch(error => {
            console.error(error);
        })
    },[])

    const gotoProfile = () => {
        const id = 1;
    }

    return (
        <div>
        <table className={context.user.darkMode ? "table table-hover-dark dark-mode" : "table table-hover"}>
            <thead className="thead-dark">
            <tr  className="row-center user-details">
                <th scope="col">User ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col"></th>
            </tr>
            </thead>
        <tbody>
            {user.map((row,key) => {
                return (
                <tr className="row-center" key={key}>
                <th scope="row">{row.id}</th>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td className="btn-container">
                    <button className="btn btn-primary btn-width" onClick={() => {
                        history.push({
                            pathname: `/users/${row.id}`,
                            state: { id: row.id}
                        })
                    }} >Profile</button>
                    <button className="btn btn-primary btn-width" onClick={() => {
                        history.push({
                            pathname: `/posts/${row.id}`,
                            state: { id: row.id}
                        })
                    }}>Posts</button>
                    <button className="btn btn-primary btn-width" onClick={() => {
                        history.push({
                            pathname: `/albums/${row.id}`,
                            state: { id: row.id}
                        })
                    }}>Albums</button>
                    <button className="btn btn-primary btn-width" onClick={() => {
                        history.push({
                            pathname: `/tasks/${row.id}`,
                            state: { id: row.id}
                        })
                    }}>Tasks</button>
                </td>
                </tr>
                )
                
            })}
  </tbody>
</table>
        </div>
    )
}

export default Dashboard
