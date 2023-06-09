import React, { useState, useEffect} from 'react';
import './App.css';
import SearchBar from './Components/SearchBar/SearchBar';
import SearchBarResults from './Components/SearchBarResults/SearchBarResults';
import Playlist from './Components/Playlist/Playlist';
import Spotify from './Components/Spotify/Spotify';



function App() {
  
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  let data =  window.localStorage.getItem('LOGGED_IN');
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(data));
  const [searchResults, setSearchResults] = useState();
  const [query, setQuery] = useState();
  function display(){
    console.log("i also ran motherfucker");
    document.getElementById('nav').style.display = 'flex';
    document.getElementById('search').style.display = 'block';

  }
  function hideDisplay(){
    console.log("I ran hurrayy");
    document.getElementById('nav').style.display = 'none';
    document.getElementById('search').style.display = 'none';
  }

  //I need to understand useEffect better and localstorage, islogged in is resetting in value everytime
  

  useEffect(()=>{
    console.log(isLoggedIn +" this should never be true until i hit true");
    window.localStorage.setItem("LOGGED_IN", isLoggedIn);
  }, [isLoggedIn]
  );

  console.log(typeof isLoggedIn);

  useEffect(()=>{
    if(isLoggedIn === "undefined"){
      setIsLoggedIn(false);
    }else if(isLoggedIn === true){
      display();
    }else{
      hideDisplay();
    }
  }, [isLoggedIn]);

  function addTrack(track){
    setPlaylist(playlist => ([...playlist, track]));
  }

  function removeTrack(trackToRemove){
    setPlaylist(playlist.filter(song => song !== trackToRemove));
  }

  function updatePlaylistName(name){
      setPlaylistName(name);
  }
  
    //trying to figure how to pass data around and i'm trying to get the songs i get to display with the add button
    async function handleSearch(query){
        const results = await Spotify.search(query);
        
        setSearchResults(results);
        if(!searchResults.error && results != null){
            console.log('im fuckin running bitch')
            console.log(searchResults);
            return searchResults;
        }
        
    };
  
  
  
  return (
    <div  className="App">
      
      <header id='header'>
        <h1>Jammming</h1>
      </header>

      <section id="section">
        <p onClick={()=>setIsLoggedIn(true)}>True</p>
        <p onClick={()=>Spotify.requestAuthorization(setIsLoggedIn)}>Login</p>
        <p onClick={()=>Spotify.fetchAccessToken()}>Get Token</p>
        <p onClick={()=>setIsLoggedIn(false)}>false</p>
        <h1>{console.log("this is happening after it is set" + typeof isLoggedIn)}</h1>
      </section>
      
      <nav id='nav'>
        <SearchBar  onChange={(e)=>setQuery(e.target.value)}/>
      </nav>
     
   
      <div id='search'>
       <SearchBarResults results={()=>handleSearch(query)} onAdd={addTrack} /> 
       <Playlist display={playlist} 
                 onRemove={removeTrack} 
                 playlistName ={playlistName}
                 updateName ={updatePlaylistName}/>
      </div>

    </div>
  );
}

export default App;
