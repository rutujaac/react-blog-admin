import { createContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'


export const PrivateRoute = ({children, ...rest}) => {
    const context = useContext(UserContext);
    return (
        <Route {...rest} render={() => {
            return context.user.token!=="" ? children : <Redirect to='/' />
        }} />
    )
} 