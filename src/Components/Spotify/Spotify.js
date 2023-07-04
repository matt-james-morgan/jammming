const baseURL = 'https://api.spotify.com'
const clientID = 'c2b3a142a4ee44aa8857ab2083965378';
const clientSecret = '3bafb5ea02074793b5fc73d1beaf5d2c';
const redirect_uri = 'http://localhost:3000/callback';
const AUTHORIZE = 'https://accounts.spotify.com/authorize?';
const TOKENURL = 'https://accounts.spotify.com/api/token';
let globalToken;
let refreshToken;
const searchCode = '/v1/search?q=';
let userID;

const Spotify = {
  getCode(){
    let code='';
    const queryString = window.location.search;
    if ( queryString.length > 0 ){
        const urlParams = new URLSearchParams(queryString);
        code=urlParams.get('code');
    }
    return code;
},

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
       
    },

    
    async search(query){
        let searchParams = {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
           
        }
        
        const response = await fetch('https://api.spotify.com/v1/search?q=' + query + '&type=track,album,artist', 
        searchParams);
        const results = await response.json();
        return results;
    },

    
      requestAuthorization(){
       let url = AUTHORIZE;
      url += 'client_id=' + clientID;
      url += '&response_type=code';
      url+= '&redirect_uri='+ redirect_uri;
      url += '&show_dialogue=true';
      url += '&scope=user-read-private user-read-email playlist-read-private playlist-read-collaborative';
      window.location.href = url;
    },

    async fetchRefreshToken(code){
      let refreshTokenParams={
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + btoa(clientID + ':' + clientSecret), // Replace with your client ID and secret
        },
        body: new URLSearchParams({
          code: code,
          redirect_uri: redirect_uri, // Replace with your redirect URI
          grant_type: 'refresh_token',
        }).toString(),
    };
    const response = await fetch (TOKENURL, refreshTokenParams);
    const results = await response.json();

    console.log(results);
  },

    async fetchAccessToken(){
      Spotify.requestAuthorization();
      const code = Spotify.getCode();
      
      Spotify.fetchRefreshToken(code);
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
        localStorage.setItem('accessToken', globalToken);
        console.log(globalToken);
      }
    

}



export default Spotify;