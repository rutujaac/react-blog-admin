import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router'
import red from '../images/red.png'
import green from '../images/green.png'
import { UserContext } from '../context/UserContext'

const Tasks = () => {
    const context = useContext(UserContext);
    const { id } = useParams();
    const history = useHistory();
    const [tasks, setTasks] = useState([]);
    
    useEffect(async () => {
        const data = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${id}`, {
            headers: {
              'Authorization': `token ${context.user.token}`
            }
          })
        .then(result => {
            console.log(result.data);
            setTasks(result.data);
        })
        .catch(error => console.error(error));
    }, [])

    return (
        <div>
        <table className={context.user.darkMode ? "table table-hover dark-mode" : "table table-hover"}>
            <thead className="thead-dark">
            <tr  className="row-center">
                <th scope="col">ID</th>
                <th scope="col">Task title</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
            </tr>
            </thead>
        <tbody>
            {tasks.map((row,key) => {
                return (
                <tr className="row-center" key={key}>
                <th scope="row">{row.id}</th>
                <td className={row.completed ? "green" : "red"}>{row.title}</td>
                <td>{row.completed ? <img src={green} width="30px" alt="completed" /> : <img src={red} width="30px" alt="not completed"/>}</td>
                </tr>
                )
                
            })}
  </tbody>
</table>
        </div>
    )
}

export default Tasks
