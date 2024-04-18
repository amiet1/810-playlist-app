const express = require('express');
const path = require('path')
const app = express();
const pathToDistFolder = path.join(__dirname, '../song-play/dist');
const serveStatic = express.static(pathToDistFolder);

const {
  getAllSongs,
  getASong,
  createSong,
  removeSong,
  updateSong
} = require('./controllers/userSongControllers');


const logRoutes = (req, res, next) => {
    const time = (new Date()).toLocaleString();
    req.time = time;
    console.log(`${req.method}: ${req.originalUrl} - ${time}`);
    next();
  };

  const parseJSON = express.json();
  app.use(logRoutes);
 app.use(parseJSON);
 app.use(serveStatic);
  
  
  //*endpoints
  app.get('/api/song', getAllSongs);
  app.get('/api/song/:id', getASong);
  app.post('/api/song', createSong);
  app.delete('/api/song/:id', removeSong);
  app.patch('/api/song/:id', updateSong);





 const port = 8090;
 app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port}`)
})