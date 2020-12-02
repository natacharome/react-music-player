import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus}) => {
    return(
        <div className={`library ${libraryStatus ? 'active-library' : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => 
                <LibrarySong 
                setSongs={setSongs}
                id={song.id}
                key={song.id} 
                songs={songs} 
                song={song} 
                audioRef={audioRef}
                setCurrentSong={setCurrentSong} 
                isPlaying={isPlaying}
                />
                )}
            </div>
        </div>
       
    )
}

export default Library;