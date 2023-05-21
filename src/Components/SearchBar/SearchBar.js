import React from "react";
import '../SearchBar/SearchBar.css';




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

