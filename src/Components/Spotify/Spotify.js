const baseURL = 'https://api.spotify.com'
const clientID = 'c2b3a142a4ee44aa8857ab2083965378';
const clientSecret = '3bafb5ea02074793b5fc73d1beaf5d2c';
const redirect_uri = 'http://localhost:3000/'
const AUTHORIZE = 'https://accounts.spotify.com/authorize?';

const Spotify ={
 
    requestAuthorization(){
        let url = AUTHORIZE;
        url += 'client_id=' + clientID;
        url += '&response_type=code';
        url+= '&redirect_uri='+ redirect_uri;
        url += '&show_dialogue=true';
        url += '&scope=playlist-modify-private playlist-modify-public';

        window.location.href = url;
    }
    
}

export default Spotify;