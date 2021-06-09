import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import { useParams } from 'react-router-dom'
import avatar from '../images/avatar.png'

const UserProfile = () => {
    const { id } = useParams();
    const context = useContext(UserContext)
    const [userdata, setUserData] = useState({})

    useEffect(async () => {
        const data = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`, {
            headers: {
              'Authorization': `token ${context.user.token}`
            }
          })
        .then(result => {
            console.log(result.data);
            setUserData(result.data);
        })
        .catch(error => console.error(error));
    }, [])

    return (
       <div className="row">
           {/* <button>Back</button> */}
           <div className="col col-lg-2 card">
           <img src={avatar} height="200px" width="200px" alt="AVATAR" className="img-fluid"/>
           <h6 className="small-title">{userdata.name}</h6>
           <h6 className="small-title">{userdata.email}</h6>
           </div>
           <div className="col card">
           <div className="card card1">
               <div className="row col1">
                <div className="col col1">
                   <div className="card-header">
                    User details
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Name:  <span className="user-details">{userdata.name}</span></li>
                        <li className="list-group-item">Email:  <span className="user-details">{userdata.email}</span></li>
                        <li className="list-group-item">Username: <span className="user-details">{userdata.username}</span> </li>
                    </ul>
                </div>
                <div className="col col1 border">
                   <div className="card-header">
                    Company details
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Name:  <span className="user-details">{userdata.company && userdata.company.name ? userdata.company.name : "None"}</span></li>
                        <li className="list-group-item">Catchphrase:  <span className="user-details">{userdata.company && userdata.company.catchPhrase ? userdata.company.catchPhrase : "None"}</span></li>
                        <li className="list-group-item">Business: <span className="user-details">{userdata.company && userdata.company.bs ? userdata.company.bs : "None"}</span> </li>
                    </ul>
                </div>
               </div>
            </div>
            <div className="row col1 border card1">
                <div className="col col1">
                   <div className="card-header">
                    Contact details
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Suite:  <span className="user-details">{userdata.address && userdata.address.suite ? userdata.address.suite : "None"}</span></li>
                        <li className="list-group-item">Phone:  <span className="user-details">{userdata.phone  ? userdata.phone : "None"}</span></li>
                        <li className="list-group-item">Website:  <span className="user-details">{userdata.website  ? userdata.website : "None"}</span></li>
                        <li className="list-group-item">Street:  <span className="user-details">{userdata.address && userdata.address.street ? userdata.address.street : "None"}</span></li>
                        <li className="list-group-item">City: <span className="user-details">{userdata.address && userdata.address.city ? userdata.address.city : "None"}</span> </li>
                        <li className="list-group-item">ZIP Code: <span className="user-details">{userdata.address && userdata.address.zipcode ? userdata.address.zipcode : "None"}</span> </li>
                        <li className="list-group-item">Geo Coordinates: <span className="user-details">{userdata.address && userdata.address.geo && userdata.address.geo.lat && userdata.address.geo.lng ? "lat: " + userdata.address.geo.lat + " lng: " + userdata.address.geo.lng : "None"}</span> </li>
                    </ul>
                </div>
           </div>
           </div>
       </div>
    )
}

export default UserProfile
