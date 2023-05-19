import React, { useState} from 'react';
import './App.css';
import SearchBar from './Components/SearchBar';
import SearchBarResults from './Components/SearchBarResults';
import Playlist from './Components/Playlist';

function App() {
  const [userInput, setUserInput] = useState(() => '');
  const [playlist, setPlaylist] = useState(() => '');
  return (
    <div className="App">
      <header>
        <h1>Jammming</h1>
      </header>
      <nav>
        <SearchBar  onSearch={setUserInput}/>
        
      </nav>
     
       <SearchBarResults results={userInput} add={setPlaylist}/> 
       {console.log(playlist)};
       <Playlist />
    </div>
  );
}

export default App;
