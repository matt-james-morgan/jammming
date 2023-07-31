import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import './Playlist.css' 

function Playlist(props){
    function handleChange(e){
        props.setPlaylistName(e.target.value);
        
    }
    return(
        <div className='userPlaylistContainer'>
                <input onChange={handleChange} default='new playlist' placeholder='Playlist Name'/>
                <button>Save To Spotify</button>
                <Tracklist playlistDisplay={props.display} onRemove={props.onRemove}/>
        </div>
    )
}

export default Playlist;