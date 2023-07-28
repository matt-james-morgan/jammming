import React, { useState, useEffect} from 'react';
import './App.css';
import SearchBar from './Components/SearchBar/SearchBar';
import SearchBarResults from './Components/SearchBarResults/SearchBarResults';
import Playlist from './Components/Playlist/Playlist';
import Spotify from './Components/Spotify/Spotify';



function App() {
  const redirect_uri = 'http://localhost:3000/callback';
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  let data =  window.localStorage.getItem('LOGGED_IN');
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(data));
  const [searchResults, setSearchResults] = useState();
  const [query, setQuery] = useState();
  

  function display(){
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
    window.localStorage.setItem("LOGGED_IN", isLoggedIn);
  }, [isLoggedIn]
  );


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

  
  
    //trying to figure how to pass data around and i'm trying to get the songs i get to display with the add button
    async function handleSearch(query){
        const results = await Spotify.search(query);
        console.log(query);
        if(results != null){
          console.log(results);
          setSearchResults(results);
        }

    };
  
    function replaceUrl(){
      window.location.replace(redirect_uri);
    }
  
    
   async function handleRedirect(){
        await Spotify.fetchAccessToken();
        setIsLoggedIn(true);
        replaceUrl();
      }

  return (
    <div  className="App">
      
      <header id='header'>
        <h1>Jammming</h1>
      </header>

      <section id="section">
        <p onClick={()=>handleRedirect()}>Login</p>
        <p onClick={()=>Spotify.getUserId()}>get user id</p>
        <p onClick={()=>Spotify.userPlaylist()}>get userPlaylist</p>
      </section>
      
      <div class='playlistContainer'>
        <div class='searchContainer'>
          <nav id='nav'>
            <SearchBar input={setQuery}/>
            <button onClick={()=>handleSearch(query)}>Search</button>
           </nav>
         </div>
         
     
         <div class='userPlaylistName'>
           <Playlist display={playlist} 
                 onRemove={removeTrack} 
                 playlistName ={playlistName}
                 updateName ={setPlaylistName}/>
          </div>
      </div>
      <div class='spotifySearch'>
        <div id='search'>
          <SearchBarResults results={searchResults} onAdd={addTrack} /> 
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
