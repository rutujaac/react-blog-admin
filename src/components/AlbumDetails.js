import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router'
import { ImageGroup, Image } from 'react-fullscreen-image'

const AlbumDetails = () => {
    const { id } = useParams();
    const context = useContext(UserContext);
    const history = useHistory();
    const [albums, setAlbums] = useState([]);

    useEffect(async () => {
        const data = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`, {
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
        <div className={context.user.darkMode ? "container-images dark-mode" : "container-images"}>
        <h1 className="card-title">Images</h1>
        <ImageGroup>
          <ul className="images">
            {albums.map(i => (
              <li key={i.id}>
                <Image src={i.url} alt="mountains" />
              </li>
            ))}
          </ul>
        </ImageGroup>
      </div>
    )
}

export default AlbumDetails
