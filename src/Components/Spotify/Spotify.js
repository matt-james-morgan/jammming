const baseURL = 'https://api.spotify.com'
const clientID = 'c2b3a142a4ee44aa8857ab2083965378';
const clientSecret = '3bafb5ea02074793b5fc73d1beaf5d2c';
const redirect_uri = 'http://localhost:3000/callback'
const AUTHORIZE = 'https://accounts.spotify.com/authorize?';
const TOKENURL = 'https://accounts.spotify.com/api/token';
let globalToken;
const searchCode = '/v1/search?q=';
let userID;

const Spotify ={
    async fetchAccessToken(){
        let authParametes = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`
        }
      
        const response = await fetch(TOKENURL, authParametes);
        const token = await response.json();
        globalToken = token.access_token;
        console.log(globalToken);
      }
        
    ,
    async getUserId(){
        
        let searchParams = {
            method: 'GET',
            headers:{
                'Authorization': 'Bearer ' + globalToken
            }
           
        }
        const response = await fetch('https://api.spotify.com/v1/me', searchParams);
        userID = await response.json();
        console.log(userID);
    },
     async getUserId2(){
        console.log('hey mf');
        fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': 'Bearer ' + globalToken
        }
      })
      .then(response => response.json())
      .then(data => {
        const userId = data.id;
        
        console.log('User ID:', userId);
      })
      .catch(error => {
        console.error('Error:', error);
      });},
      
    
    async userPlaylist(query){
        let searchParams = {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + globalToken
            }
           
        }
        
        const response = await fetch('https://api.spotify.com/v1/search?q=' + query + '&type=track,album,artist', 
        searchParams);
        const results = await response.json();
        return results;
    },
    
    async search(query){
        let searchParams = {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + globalToken
            }
           
        }
        console.log(query);
        const response = await fetch('https://api.spotify.com/v1/search?q=' + query + '&type=track,album,artist', 
        searchParams);
        const results = await response.json();
        return results;
    },
    
    requestAuthorization(setIsLoggedIn){
        
        setIsLoggedIn(true);
        let url = AUTHORIZE;
        url += 'client_id=' + clientID;
        url += '&response_type=code';
        url+= '&redirect_uri='+ redirect_uri;
        url += '&show_dialogue=true';
        url += '&scope=playlist-modify-private playlist-modify-public playlist-read-private playlist-read-collaborative user-read-private user-read-email';
        window.location.href = url;
        
    }
    
   
}



export default Spotify;