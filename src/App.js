import React, { useState} from 'react';
import './App.css';
import SearchBar from './Components/SearchBar/SearchBar';
import SearchBarResults from './Components/SearchBarResults/SearchBarResults';
import Playlist from './Components/Playlist/Playlist';
import Spotify from './Components/Spotify/Spotify';

function App() {
  const [userInput, setUserInput] = useState(() => '');
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');

  function addTrack(track){
    
    setPlaylist(playlist => ([...playlist, track]));
    
  }

  function removeTrack(trackToRemove){
    
    setPlaylist(playlist.filter(song => song !== trackToRemove));
    
  }

  function updatePlaylistName(name){
      setPlaylistName(name);
      
  }
  

  return (
    <div onload={()=>Spotify.onPageLoad()}className="App">
      
      <header>
        <h1 onClick={()=>Spotify.requestAuthorization()}>Jammming</h1>
      </header>

      <nav>
        <SearchBar  onSearch={setUserInput}/>
      </nav>
     
       <SearchBarResults results={userInput} onAdd={addTrack} /> 
       <Playlist display={playlist} 
                 onRemove={removeTrack} 
                 playlistName ={playlistName}
                 updateName ={updatePlaylistName}/>
    </div>
  );
}

export default App;
