import React from "react";
import '../Components/SearchBar.css';
import SearchBarResults from '../Components/SearchBarResults'



//Searches through list of songs and calls searchbarresults to present them//
function eventHandler(e){
    const userAnswer= e.target.value;
    return(
        <SearchBarResults results={userAnswer} />
    );
}

function SearchBar(){
    return(
        <div>
        <input id='searchBar' type='text'
        placeholder='Search Artist/Album/Song'
        onChange={eventHandler}
        />
         <button type='submit'></button>
         </div>
    )
}

export default SearchBar;