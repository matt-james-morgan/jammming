import React  from "react";
import '../SearchBarResults/SearchBarResults.css';




function SearchBarResults(props){

   if(props.results){
      let filter=[];
      console.log(props.results.tracks.items.length);
      for(let i =0; i<props.results.tracks.items.length; i++){
         console.log(i);
         filter.push(props.results.tracks.items[i]);
      }
      console.log(filter);
   
     return(
        <div className="SearchResults">
        <section>
        {filter.map(song =>
        <ul>
         <li key={song.name}>{song.name}</li>
         <li key={song.album.name}>{song.album.name}</li>
         <li key={song.artists["0"].name}>{song.artists["0"].name}</li>
         <button onClick={()=>props.onAdd(song.name)}>Add</button>
         </ul>
)} 
        </section>

        </div>
     )
   }
     

}

export default SearchBarResults;