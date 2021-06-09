import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import Users from './components/Users';
import Navbar from './components/Navbar';
import PostDetails from './components/PostDetails';
import Tasks from './components/Tasks';
import { Switch, Route } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import Posts from './components/Posts';
import Albums from './components/Albums';
import AlbumDetails from './components/AlbumDetails';
import { PrivateRoute } from './route/PrivateRoute';

function App() {
  const [user,setUser] = useState({})
  const title = "this is the title"

  useEffect(() => {
    const user_data = localStorage.getItem("user");
    if(user_data) {
      setUser(JSON.parse(user_data))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("user",JSON.stringify(user));
  })

  return (
    <div className={user.darkMode ? "dark-mode" : ""}>
      <UserContext.Provider value={{user,setUser}}>
        <Navbar />
      <Switch>
        <Route exact path='/' component={Login} />
        <PrivateRoute exact path='/dashboard'>
            <Dashboard />
        </PrivateRoute>
        <PrivateRoute exact path='/users'>
            <Users />
        </PrivateRoute>
        <PrivateRoute exact path='/users/:id'>
            <UserProfile />
        </PrivateRoute>
        <PrivateRoute exact path='/posts/:id'>
            <Posts />
        </PrivateRoute>
        <PrivateRoute exact path='/post-details/:id'>
            <PostDetails />
        </PrivateRoute>
        <PrivateRoute exact path='/tasks/:id'>
            <Tasks />
        </PrivateRoute>
        <PrivateRoute exact path='/albums/:id'>
            <Albums />
        </PrivateRoute>
        <PrivateRoute exact path='/album-images/:id'>
            <AlbumDetails />
        </PrivateRoute>
     </Switch>
     </UserContext.Provider>
    </div>
  );
}

export default App;
