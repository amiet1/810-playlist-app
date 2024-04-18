//user can access a form on the home page to add a song 
// Form for creating a new song
// List of all songs
import React from 'react'
import fetchData from '../utils/fetchData';
import { useState, useEffect } from 'react';
import SongDetails from './songDetails';
const Home = () => {

    //*get all songs on render
    const [songs, setSongs] = useState([]);
    const [title,setTitle] = useState('')
    const [artist, setArtist] = useState('');
   


    //*state of form submisson state 

    useEffect(() => {
        const doFetch = async () => {
            try {
                const [data, error] = await fetchData("/api/song");
                if(data) setSongs(data);    
            } catch (error) {
                console.log(error.message)
            }
        }
        doFetch()
    } ,[])

    console.log(songs)

    //*add/create a song to playlis

    const addNewSong = async (e) => {
        e.preventDefault();
        try { 
            const [data, error] = await fetchData("/api/song", {
                method : "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ title: title, artist: artist })
            })
            if(error){
                return console.error('Error:',error)
            }

            if(data) setSongs([...songs,data])
            setTitle(''); 
            setArtist('');

            } catch (error) {
                console.log(error)
            }
        
    }


  return (
    <div>
        <h1>810-PLAY</h1>
        <h2>Your Playlist:</h2>
        <form onSubmit={addNewSong}>
            <label htmlFor="title">Add a new song here:</label>
            <div>
                <label  htmlFor="title">Title:</label>
               <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        
            </div>
            <div>
                <label htmlFor="artist">Artist:</label>
               <input type="text" name="artist" id="artist" value={artist} onChange={(e) => setArtist(e.target.value)} />
       
            </div>
             <button type="submit">Submit</button> 
        </form>
        <SongDetails></SongDetails>

    </div>
  )
}

export default Home
