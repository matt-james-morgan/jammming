import React  from "react";
import '../SearchBarResults/SearchBarResults.css';




function SearchBarResults(props){

   if(props.results){
      let filter=[];
      console.log(props.results.tracks.items.length);
      for(let i =0; i<10; i++){
         console.log(i);
         filter.push(props.results.tracks.items[i]);
      }
      console.log(filter);
   
     return(
        <div className="SearchResults">
        
        {filter.map(song =>
        <div className='songInfo'>
        <ul>
            
            <li  class ='songName'key={song.name}>{song.name}</li>
            <li key={song.album.name}>Album: {song.album.name}</li>
            <li key={song.artists.name}> Artist:{song.artists.name}</li>
         </ul>
         <button onClick={()=>props.onAdd(song.name)}>Add</button>
         </div>
         )}; 
        

        </div>
     )
   }
     

}

export default SearchBarResults;