const baseURL = 'https://api.spotify.com'
const clientID = 'c2b3a142a4ee44aa8857ab2083965378';
const clientSecret = '3bafb5ea02074793b5fc73d1beaf5d2c';
const redirect_uri = 'http://localhost:3000/callback';
const AUTHORIZE = 'https://accounts.spotify.com/authorize?';
const TOKENURL = 'https://accounts.spotify.com/api/token';
let globalToken;
const searchCode = '/v1/search?q=';
let userID;


const Spotify = {
    async fetchAccessToken(code){
        let tokenParams={
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  Authorization: 'Basic ' + btoa(clientID + ':' + clientSecret), // Replace with your client ID and secret
                },
                body: new URLSearchParams({
                  code: code,
                  redirect_uri: redirect_uri, // Replace with your redirect URI
                  grant_type: 'authorization_code',
                }).toString(),
              };
              const response = await fetch (TOKENURL, tokenParams);
              const results = await response.json();
              globalToken = results.access_token;
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
        try {
            const response = await fetch('https://api.spotify.com/v1/me', searchParams);
            if (response.status === 401) {
              throw new Error('Unauthorized');
            }
            const userData = await response.json();
            userID = userData.id;
            console.log('User ID:', userID);
          } catch (error) {
            console.error('Error:', error);
          }
       /* console.log('https://api.spotify.com/v1/me', searchParams);
        const response = await fetch('https://api.spotify.com/v1/me', searchParams);
        userID = await response.json();
        console.log(userID);*/
    },

    
    
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
        console.log(results);
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
        url += '&scope=user-read-private user-read-email';
        window.location.href = url;
        
        
    }
    

}



export default Spotify;