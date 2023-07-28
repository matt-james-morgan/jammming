import React from "react";
import '../Tracklist/Tracklist.css';

function Tracklist(props){
    
    return(
        <div>
            <ul>
                {props.playlistDisplay.map(song => <li key={song}>{song}<button onClick={()=>props.onRemove(song)}>Delete</button></li>)}
            </ul>
            
        </div>
    );
   
}

export default Tracklist;