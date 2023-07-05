const baseURL = 'https://api.spotify.com'
const clientID = 'c2b3a142a4ee44aa8857ab2083965378';
const clientSecret = '3bafb5ea02074793b5fc73d1beaf5d2c';
const redirect_uri = 'http://localhost:3000/callback';
const AUTHORIZE = 'https://accounts.spotify.com/authorize?';
const TOKENURL = 'https://accounts.spotify.com/api/token';
let globalToken;
let globalRefreshToken;
const searchCode = '/v1/search?q=';
let userID;

//July 5, next step: catch error when token expires for all api calls
// reset url on login, window.history.pushstate not working async functions

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
async refreshAccessToken(){
  let refreshToken = localStorage.getItem('refreshToken');
  
  let params={
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa(clientID + ':' + clientSecret),
      'Content-Type':'application/x-www-form-urlencoded' // Replace with your client ID and secret
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }).toString(),
};
const response = await fetch(TOKENURL , params);
let code = await response.json();
console.log(code);
let newAccessToken = code.access_token;
localStorage.setItem('accessToken', newAccessToken);

},
  tokenCheck(response){
    
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

    async fetchAccessToken(){
      Spotify.requestAuthorization();
      const code = Spotify.getCode();
      
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
        globalRefreshToken = results.refresh_token;
        localStorage.setItem('accessToken', globalToken);
        localStorage.setItem('refreshToken', globalRefreshToken);
        
        
        
      }
    

}



export default Spotify;