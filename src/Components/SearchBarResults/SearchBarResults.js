import React  from "react";
import '../SearchBarResults/SearchBarResults.css';
import Spotify from "../Spotify/Spotify";

const songs = [
    {name: "Beast of Burden"},
    {name: 'Lemon Song'},
    {name: 'Mannish Boy'}
];


function SearchBarResults(props){
   
   let filteredSongs = songs.filter(song => song.name.includes(props.results));

     return(
        <div className="SearchResults">
         {filteredSongs.map(song => <h1 key={song.name}>{song.name}<button onClick={()=>props.onAdd(song.name)}>Add</button>
         </h1>)} 
        </div>
     )
     

}

export default SearchBarResults;