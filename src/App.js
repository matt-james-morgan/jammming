import React, { useState, useEffect} from 'react';
import './App.css';
import SearchBar from './Components/SearchBar/SearchBar';
import SearchBarResults from './Components/SearchBarResults/SearchBarResults';
import Playlist from './Components/Playlist/Playlist';
import Spotify from './Components/Spotify/Spotify';

const clientID = 'c2b3a142a4ee44aa8857ab2083965378';
const clientSecret = '3bafb5ea02074793b5fc73d1beaf5d2c';
const redirect_uri = 'http://localhost:3000/callback'
const AUTHORIZE = 'https://accounts.spotify.com/authorize?';


function App() {
  const [userInput, setUserInput] = useState(() => '');
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [isLoggedIn, setIsLoggedIn] = useState(()=>false);

  //I need to understand useEffect better and localstorage, islogged in is resetting in value everytime
  useEffect(()=>{
    window.localStorage.setItem("LOGGED_IN", isLoggedIn);
  }, [isLoggedIn]
  );

  function addTrack(track){
    setPlaylist(playlist => ([...playlist, track]));
  }

  function removeTrack(trackToRemove){
    setPlaylist(playlist.filter(song => song !== trackToRemove));
  }

  function updatePlaylistName(name){
      setPlaylistName(name);
      
  }
function display(){
  document.getElementById('nav').style.display = 'flex';
  document.getElementById('search').style.display = 'block';
}
function hideDisplay(){
  document.getElementById('nav').style.display = 'none';
  document.getElementById('search').style.display = 'none';
}

//trying to figure how to toggle display
function toggleDisplay(isLoggedIn){
  window.localStorage.getItem("LOGGED_IN") ?  
  display() : hideDisplay();
  console.log(isLoggedIn);
}
 
 

  

  return (
    <div  className="App">
      
      <header id='header'>
        <h1>Jammming</h1>
      </header>

      <section id="section">
        <p onClick={()=>Spotify.requestAuthorization(setIsLoggedIn)}>Login</p>
        <p onClick={()=>Spotify.fetchAccessToken()}>Get Token</p>
        
      </section>
      
      <nav id='nav' onLoad={toggleDisplay}>
        <SearchBar  onChange={()=>Spotify.search("Mannish Boy")}/>
      </nav>

      <div id='search'>
       <SearchBarResults results={userInput} onAdd={addTrack} /> 
       <Playlist display={playlist} 
                 onRemove={removeTrack} 
                 playlistName ={playlistName}
                 updateName ={updatePlaylistName}/>
      </div>

    </div>
  );
}

export default App;
