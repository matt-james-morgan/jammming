const baseURL = 'https://api.spotify.com'
const clientID = 'c2b3a142a4ee44aa8857ab2083965378';
const clientSecret = '3bafb5ea02074793b5fc73d1beaf5d2c';
const redirect_uri = 'http://localhost:3000/'
const AUTHORIZE = 'https://accounts.spotify.com/authorize?';
const TOKEN = 'https://accounts.spotify.com/api/token';

const Spotify ={
    onPageLoad(){
        if(window.location.search.length > 0){
            this.handleRedirect();
        }
    },
    handleRedirect(){
        let code = this.getCode();
        this.fetchAccessToken(code);
    },
    fetchAccessToken(code){
        let body='https://accounts.spotify.com/api/token';
        body += '&Content-Type: application/x-www-form-urlencoded';
        body += '&grant_type=client_credentials';
        body += '&client_id=' + clientID;
         body+= '&client_secret=' + clientSecret;
         this.callAuthorizationApi();
            },
    callAuthorizationApi(){

    },
    getCode(){
        let code =null;
        const queryString = window.location.search;
        if(queryString.length > 0){
            const urlParams = new URLSearchParams(queryString);
            code = urlParams.get('code');
        }
        return code;
    },
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