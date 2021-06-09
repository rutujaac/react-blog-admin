import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router'
import axios from 'axios'
import loginimg  from '../images/login-img.png'
import { UserContext } from '../context/UserContext'

const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const history = useHistory();
    const context = useContext(UserContext)

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const loginUser = (event) => {
        event.preventDefault();
        axios.post("https://reqres.in/api/login",{email: email,password: password})
        .then(result => {
            if(result.status === 200) {
                context.setUser({
                    isAuth: true,
                    token: result.data.token,
                    username: email
                })
                history.push('/dashboard')
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="container">
        <img src={loginimg} alit="login" height="310px" width="400px" class="img-fluid"/>
        <div className="mb-3">
        <label for="formGroupExampleInput" className="form-label"></label>
        <input type="text" className="form-control" onChange={handleEmail} id="formGroupExampleInput" placeholder="Email" />
        </div>
        <div className="mb-3">
        <label for="formGroupExampleInput2" className="form-label"></label>
        <input type="password" className="form-control" onChange={handlePassword} id="formGroupExampleInput2" placeholder="Password" />
        </div>
        <button type="button" className="btn btn-primary btn-block" onClick={loginUser}>LOGIN</button>
        </div>
    )
}

export default Login
