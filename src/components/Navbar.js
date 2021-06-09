import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'


const Navbar = () => {
    const context = useContext(UserContext)
    const signoutUser = () => {
        if(window.confirm('Are you sure you want to logout?')) {
            context.setUser({
                isAuth: false,
                token: "",
                username: "",
                darkMode: false
            })
        }
       
    }
    return (
        <div>
            <nav className="navbar">
                <Link className="navbar-brand" to='/dashboard'>TheReactBlog</Link>
                <label class="switch">
                <input type="checkbox" 
                onChange={()=> {
                    context.setUser({
                        ...context.user, darkMode: !context.user.darkMode
                    })
                }}/>
                <span class="slider round"></span>
                </label>
               
                {context.user.token ? <button className="btn btn-link" onClick={signoutUser}>Logout</button> : ""}
            </nav>
        </div>
    )
}

export default Navbar
