//*               C O N T R O L L E R S



const Song = require('../models/songModel')

// const serveCreateSong = (req,res) => {
// const song = Song.createSong;
// res.send(song)
// }

//*get all Songs
const getAllSongs = (req,res) => {
    const songList = Song.getSongs();
    console.log("songlist: ", songList)
    res.send(songList)
}


//*get a song
const getASong = (req,res) => {
    const {id } = req.params;
    const songTitle = Song.getSong(+id);
    res.send(songTitle);
}

//* add CREATE song 

/** get the data from the request body(req.body)
 * creates a new instance of the class with the given info
 * sends response to client 
 */

const createSong = (req,res) => {
    console.log("reqbody: ", req.body)
const {title, artist} = req.body; //*the post request obj needs to match 
if (!title || !artist) return "Not enough information"
const newSong = new Song(title, artist)
res.send(newSong);
}

const removeSong = (req,res) => {
const { id } = req.params;
const {title, artist} = req.body;
if (!title || !artist) return "Song not Found";
const remove = Song.destroySong(+id)
res.send(remove)
}

const updateSong = (req,res) => {
    const {title, artist} = req.body
    const { id } = req.params;
    const update = Song.updateSong(+id, title, artist)
    if(update){
        res.send(update);
    } else {
        res.status(404).send('Song not found')
    }
}

module.exports = {
    getAllSongs,
    getASong,
    createSong,
    removeSong,
    updateSong
};


