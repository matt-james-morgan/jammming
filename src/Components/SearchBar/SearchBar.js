import React, {useState} from "react";
import '../SearchBar/SearchBar.css';
import Spotify from "../Spotify/Spotify";



//Searches through list of songs and calls searchbarresults to present them//


function SearchBar(props){
  
    const handleInput = (e) =>{
        props.input(e.target.value);
    }

    return(
        <div>
        <div className="searchBarDiv">
        <input onChange={handleInput} id='searchBar' type='text'
        placeholder='Search Artist/Album/Song'
        />
         </div>
         </div>
        
            
         
        
         
         
    )
}

export default SearchBar;

