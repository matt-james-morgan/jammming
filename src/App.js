import React, { useState} from 'react';
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
  const [isLoggedIn, setIsLoggedIn] = useState(()=>{
    return false;
  });

  function addTrack(track){
    setPlaylist(playlist => ([...playlist, track]));
  }

  function removeTrack(trackToRemove){
    
    setPlaylist(playlist.filter(song => song !== trackToRemove));
    
  }

  function updatePlaylistName(name){
      setPlaylistName(name);
      
  }

  function loadPage(){
    
       return document.getElementById('header').style.display = 'none';
    
  }
  function handleLogin(){
    let url = AUTHORIZE;
    url += 'client_id=' + clientID;
    url += '&response_type=code';
    url+= '&redirect_uri='+ redirect_uri;
    url += '&show_dialogue=true';
    url += '&scope=playlist-modify-private%20playlist-modify-public';
    console.log(url);
     window.location.replace(url);
     
  }

  

  return (
    <div className="App">
      
      <header id='header'>
        <h1>Jammming</h1>
      </header>

      <section id="section">
        <p onClick={handleLogin}>Login</p>
        <p onClick={()=>Spotify.fetchAccessToken()}>Get Token</p>
      </section>

      <nav id='nav'>
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
