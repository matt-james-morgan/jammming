import React, {useState} from "react";
import '../Components/SearchBar.css';
import SearchBarResults from '../Components/SearchBarResults'



//Searches through list of songs and calls searchbarresults to present them//


function SearchBar(props){

    function getUserInput(e){
        
        props.onSearch(() => e.target.value);
        
    }
    return(
        <div className="searchBarDiv">
        <input id='searchBar' type='text'
        placeholder='Search Artist/Album/Song'
        onChange={getUserInput}
        />
         </div>
    )
}

export default SearchBar;

