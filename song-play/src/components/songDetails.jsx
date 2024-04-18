
import fetchData from "../utils/fetchData";
import { useState, useEffect } from 'react'
import {useParams, useNavigate, Link} from 'react-router-dom';



const songDetails = () => {
    const [songs,setSong] = useState(undefined)
    const [title, setTitle] = useState(''); 
    const [artist, setArtist] = useState(''); 
    const [newsong, setNewSong] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const doFetch = async () => {
            try {
                const [data, error] = await fetchData(`/api/song`);
                if(data) setSong(data);
                
            } catch (error) {
                console.log(error.message)
            }
        }
        doFetch()
    } ,[])
    console.log(songs)
    const updateSongDetails = async (e) => {
        e.preventDefault();
        try {
          const options = {
            method: "PATCH",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({ title, artist })
          }
          const [data, error] = await fetchData(`/api/fellows/${id}`, options)
          if (data) setSong(data)
        } catch (error) {
          console.log(error);
        }
        setNewSong('')
      }
    


    const deleteSong = async () => {
        try {
          const options = {
            method: "DELETE"
          }
          const [data, error] = await fetchData(`/api/song/${id}`, options)
          navigate('/');
        } catch (error) {
          console.log(error);
        }
      }




  return (
    <div>
      <h1>Your Song Details</h1>
      { songs && songs.map(song => {
        return (
          <div>
        
      <p>{song.artist} - {song.title} - {song.id}</p>
      <button onClick={deleteSong}>Delete Song</button>
      <form onSubmit={updateSongDetails}>
        <label htmlFor="name">Update Song Title</label>
        <input type="text" name="name" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor="name">Update Song Artist</label>
        <input type="text" name="name" id="artist" value={artist} onChange={(e) => setArtist(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <Link to='/'>
        <button>Go Home</button>
      </Link>
      </div>
        )
        
      })}
       
      
    </div>
  )
}

export default songDetails


// Create: Add a new song to the list.
// Read: Display a single song.

