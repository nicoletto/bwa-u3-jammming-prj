const client_id = '1723f8e8d9e04dd9982653dfc3b9a5b9';
const returnUri = 'http://localhost:3000/';

let accessToken = undefined;
let expiresIn = undefined;

const Spotify = {

  getAccessToken(){
    if(accessToken){
      return accessToken;
    }
    const myUrl = window.location.href;
    const accessRegEx= /access_token=([^&]*)/;
    const expiresRegEx =/expires_in=([^&]*)/;
    const UrlToken = myUrl.match(accessRegEx);
    const UrlExpires = myUrl.match(expiresRegEx);
      if(UrlToken && UrlExpires){
        accessToken = UrlToken[1];
        expiresIn = UrlExpires[1];
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
      }else{
        window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${returnUri}`
      }
 },
 search(term){
   if(term){
     const userToken = this.getAccessToken();
     return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }).then(response => {
      return response.json();
    }).then(jsonResponse => {
        if (jsonResponse.tracks.items.length > 0) {
          return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
        }
      });
   }
 },


 savePlaylist(playListName, trackURIs){
   if(playListName, trackURIs){
     const userToken = this.getAccessToken();
     const headers = {
        Authorization: `Bearer ${userToken}`
     }
     let uid;
     let playlistID;

     return fetch(`https://api.spotify.com/v1/me`, {
          headers: headers
        }).then(response => {
          if(response.ok){
            return response.json();
          }
          throw new Error('Request failed!');
        }).then(function (jsonResponse){
          uid = jsonResponse.id;
        }).then(
          ()=>{
            return fetch(`https://api.spotify.com/v1/users/${uid}/playlists`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: playListName})
                })
        }).then(response => {
          if(response.ok){
            return response.json();
          }
          throw new Error('Request failed!');
        }).then(jsonResponse => {
          playlistID = jsonResponse.id;
        }).then(
          ()=>{
              return fetch(`https://api.spotify.com/v1/users/${uid}/playlists/${playlistID}/tracks`, {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({uris: trackURIs})
              })
        }).then(response => {
              if(response.ok){
                return response.json();
              }
              throw new Error('Request failed!');
            }).then(jsonResponse => {
            })
          }
        }
}


export default Spotify;
