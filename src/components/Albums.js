import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router'

const Albums = () => {
    const { id } = useParams();
    const context = useContext(UserContext);
    const history = useHistory();
    const [albums, setAlbums] = useState([]);

    useEffect(async () => {
        const data = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${id}`, {
            headers: {
              'Authorization': `token ${context.user.token}`
            }
          })
        .then(result => {
            console.log(result.data);
            setAlbums(result.data);
        })
        .catch(error => console.error(error));
    }, [])

    return (
        <div className="container container-album">
            <div class="row row-cols-5">
            {albums.map((album, key) => {
                return (
                    <div className={context.user.darkMode ? "card card-album dark-mode" : "card card-album"} key={key}>
                    <div className="card-body">
                    <h5 className="card-subtitle user-details">Album ID: {album.id}</h5>
                    <h6 className="card-subtitle mb-2 text-muted user-details">User ID: {album.userId}</h6>
                    <p className="card-text">{album.title}</p>
                    <button className="btn btn-primary btn-album" onClick={() => {
                        history.push({
                            pathname: `/album-images/${album.id}`,
                            state: { id: album.id}
                        })
                    }}>View album</button>
                    </div>
                    </div>
                )
                
            })}
            </div>
        </div>
    )
}

export default Albums
