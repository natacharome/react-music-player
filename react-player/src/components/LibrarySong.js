import React from "react";

const LibrarySong = ({ song, songs, setCurrentSong,audioRef, isPlaying, setSongs, id }) => {

    const songSelectHandler = () => {
        const selectedSong = songs.filter((state) => state.id === id);
        setCurrentSong({ ...selectedSong[0] });
        //Set Active in library
       setSongs(songs.map((targetSong) => {
           return {
               ...targetSong,
               active: targetSong.id === song.id
           }
       }
       ))

        // check if song is playing 
        if(isPlaying) {
            const playPromise = audioRef.current.play();
            if(playPromise !== undefined) {
                playPromise.then((audio) => {
                    audioRef.current.play();
                })
            }
        }
    }
    return(
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : "" }`} >
            <img alt="Image cover" src={song.cover}/>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
       
    )
}

export default LibrarySong;