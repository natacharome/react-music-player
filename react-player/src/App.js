import React, {useState, useRef} from "react";
//Import styles 

import "./styles/app.scss";

// Util
import data from "./data";

//Adding components
import Player from './components/Player';
import Song from './components/Song';
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {

   //Ref
   const audioRef = useRef(null);

  // State 
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);

  // State
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0
  });

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // calculate percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    console.log(animation);
    setSongInfo({...songInfo, currentTime: current, duration, animationPercentage: animation})
  }

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if(isPlaying) audioRef.current.play();
  }

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player setSongs={setSongs} setCurrentSong={setCurrentSong} songs={songs} songInfo={songInfo} setSongInfo={setSongInfo} audioRef={audioRef} currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
      <Library 
      libraryStatus={libraryStatus}
      isPlaying={isPlaying}
      audio={audioRef} 
      songs={songs} 
      setCurrentSong={setCurrentSong} 
      setSongs={setSongs}
      />
      <audio 
            onEnded={songEndHandler}
            onTimeUpdate={timeUpdateHandler} 
            ref={audioRef}
            src={currentSong.audio}
            onLoadedMetadata={timeUpdateHandler} >

      </audio>
    </div>
  );
}

export default App;
