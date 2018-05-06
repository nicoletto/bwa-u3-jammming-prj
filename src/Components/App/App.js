import React, { Component } from 'react';
import './App.css';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import SearchBar from '../SearchBar/SearchBar.js';
import Track from '../Track/Track.js';
import Spotify from '../../util/Spotify.js';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
   };
   this.addTrack = this.addTrack.bind(this);
   this.removeTrack = this.removeTrack.bind(this);
   this.updatePlaylistName = this.updatePlaylistName.bind(this);
   this.savePlaylist = this.savePlaylist.bind(this);
   this.search = this.search.bind(this);
  }


  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }else{
      this.setState({ playlistTracks: [...this.state.playlistTracks, track] })
    }
  }
  updatePlaylistName(name){
    this.setState({playlistName:name});
  }

  removeTrack(track){
    let myplaylist =this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id);
    this.setState({ playlistTracks: myplaylist })
  }

  savePlaylist(playlistTracks){
    const playlistName = this.state.playlistName;
    const trackURIs = this.state.playlistTracks.map(track => {
      return track.uri;
    });
    
    Spotify.savePlaylist(playlistName,trackURIs);
  }

  search(term){
    Spotify.search(term).then(tracks => {
      this.setState({searchResults: tracks});
    });;

  }


  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
            onSearch={this.search}
           />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              onRemove={this.removeTrack}/>
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onAdd={this.addTrack}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
           />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
