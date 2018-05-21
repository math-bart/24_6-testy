import React, { Component } from 'react';
import './App.css';
import PlayersList from './components/PlayersList/PlayersList';
import AddPlayer from './components/AddPlayer/AddPlayer';

class App extends Component {
  constructor() {
    super();

    this.state = {
      players: []
    }
  }

  onScoreUpdate = (playerIndex, scoreChange) => {
    let  newPlayers= this.state.players.map((player, index) => {
      if (index === playerIndex) {
        return { ...player, score: player.score + scoreChange };
      }
      return player;
    })
    let sort = newPlayers.sort(this.compare);
    this.setState({
      players: sort
    })
  }
  
  compare = (a, b) => {
    const scoreA = a.score;
    const scoreB = b.score;
    let comparison = 0;
    if (scoreA > scoreB) {
      comparison = -1;
    } else if (scoreA < scoreB) {
      comparison = 1;
    }
    return comparison;
  }
  
  onPlayerAdd = (playerName) => {
    const newPlayer = {
      name: playerName,
      score: 0,
    }
    this.setState({
      players: [...this.state.players, newPlayer]
    })
  }
  
  onPlayerRemove = (i) => {
    const newPlayers = this.state.players.filter(player => player.name !== this.state.players[i].name);
    let sort = newPlayers.sort(this.compare);
    this.setState({
      players: sort
    })
  }
  
  render() {
    return (
      <div className="App">
        <AddPlayer onPlayerAdd={this.onPlayerAdd} />
        <PlayersList players={this.state.players} onScoreUpdate={this.onScoreUpdate} onPlayerRemove={this.onPlayerRemove} />
      </div>
    );
  }
}

export default App;
