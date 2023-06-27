import React from 'react';
import Tracklist from '../Tracklist/Tracklist';


function Playlist(props){
    function handleChange(e){
        props.setPlaylistName(e.target.value);
        
    }
    return(
        <div>
            <section>
                <input onChange={handleChange} default='new playlist'/>
                <Tracklist playlistDisplay={props.display} onRemove={props.onRemove}/>
            </section>
        </div>
    )
}

export default Playlist;