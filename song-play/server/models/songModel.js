const generateId = ((id = 0) => () => id += 1);

class Song {
    static #allSongs = [];
    
    constructor(title, artist) {
        this.title = title;
        this.artist = artist;
        this.id = generateId()();
        Song.#allSongs.push(this);
    }

    static createSong(title, artist) {
        return new Song(title, artist);
    }

    static getSongs() {
        return Song.#allSongs;
    }

    static getSong(id) {
        return Song.#allSongs.find((song) => song.id === id);
    }

    static destroySong(id) {
        const songIndex = Song.#allSongs.findIndex((song) => song.id === id);
        if (songIndex >= 0) {
            const deleteSong = Song.#allSongs.splice(songIndex, 1)[0];
            console.log(`Song ${deleteSong.title} has been deleted!`);
        } else {
            console.log(`Song with id ${id} was not found!`);
        }
    }

    static deleteAllSongs() {
        if (!Song.#allSongs.length) return null;
        Song.#allSongs.length = 0;
        return Song.#allSongs;
    }

    static updateSong(id, newArtist, newTitle) {
        const songToUpdate = Song.#allSongs.find((song) => song.id === id);
        if (songToUpdate) {
            songToUpdate.artist = newArtist;
            songToUpdate.title = newTitle;
        }
        return songToUpdate;
    }
}

module.exports = Song