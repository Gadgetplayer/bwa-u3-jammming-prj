import React from 'react';

import Spotify from '../../util/Spotify';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';

Spotify.getAccessToken();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [name, artist, album, id],
      playlistName: 'Playlist'
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.loadPlayList = this.loadPlayList.bind(this);

  }

  addTrack(track) {
        let newPlaylist = this.state.playList;
        if (!newPlaylist.some(element => element.id === track.id)) {
            newPlaylist.push(track);
            this.setState({playList: newPlaylist});
        }
    }

    removeTrack(track) {
        let newPlaylist = this.state.playList;
        newPlaylist.splice(newPlaylist.indexOf(track), 1);
        this.setState({playList: newPlaylist});
    }

    updatePlayListName(newTitle) {
        this.setState({PlayListName: newTitle});
    }

    searchSpotify(term) {
        Spotify.search(term).then(tracks => {
            this.setState({searchResults: tracks});
        });
    }

    loadPlayList() {
        Spotify.loadPlayList(this.state.PlayListName).then(tracks => {
            if (tracks) {
                this.setState({playList: tracks});
            }
        });
    }

    savePlayList() {
        Spotify.savePlayList(this.state.PlayListName, this.state.playList).then(response => {
            this.setState({
                playList: [],
                PlayListName: 'New Playlist'
            });
        });
}

render() {
     return (
       <div className="App">
           <SearchBar searchSpotify={this.searchSpotify}/>
           <div className="App-playlist">
             <SearchResults
               tracks={this.state.searchResults}
               onClick={this.addTrack}
             />
             <PlayList
               title={this.state.PlayListName}
               onChange={this.updatePlayListName}
               tracks={this.state.playList}
               onClick={this.removeTrack}
               savePlayList={this.savePlayList}
               loadPlayList={this.loadPlayList}
             />
           </div>
       </div>
     );
 }
}

export default App;
