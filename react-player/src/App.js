
import React, {useState} from "react";
//Import styles 

import "./styles/app.scss";

// Util
import data from "./data";

//Adding components
import Player from './components/Player';
import Song from './components/Song';

function App() {

  // State 
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
    </div>
  );
}

export default App;
