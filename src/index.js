import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';




/**
 * APIs
 * 1. Login / Create Acct
 * 2. list all playlists (+ Drainlists)
 * 3. Edit Drainlists
 * 3. sync (cron style API)
 */

// UX is: go to site -> log in (or create)
//  you are presented with a landing page which contains all of your drainLists (and the ability to create new ones, and a force sync button)
//  you can then click a drain which takes you to the drain edit page or delete it, where you can then see the Drain, it's sources, and other data
// Login / token process is a simple passthrough to the backend (for now it is a no-op, just assume Danny User)
// Drainlist landing page needs to be made
// Drainlist Detail page needs to be made

class Landing extends React.Component  {
    render() {
        return (
        <div>
            <header onClick={() => alert(1)}>
                {this.renderHeader()}
            </header>
            <div>
                {this.renderDrains()}
            </div>
            <div>
                {this.renderFooter()}
            </div>
        </div>
    )
    }
    renderHeader() {
        return this.getPlaylists()
    }
    renderDrains() {
        return "drains"
    }
    renderFooter() {
        return "foot"
    }
    getPlaylists() {
        axios.get("http://localhost:5000/get_playlists").then((response) => {
            console.log(response.data);
            alert(1);
        }, (resp) => console.log(resp));
        return "a";
    }
}

class Square extends React.Component {
  render() {

    return (
      <button className="square" onClick={() => this.props.onClick()}>
          {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    var opts = ["X", "O"];
    var idx = 0;
    this.player = {
      opts: opts,
      idx : idx,
      value: opts[idx],
    };

    this.state = {
      squares: Array(9).fill(null)
    }
  }
  renderSquare(i) {
    return <Square 
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)} />;
  }
  checkVictory() {
    var a = true
    for (var i in this.state.squares) {
        if (this.state.squares[i] == null) {a = false}
    }
    return a
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (!squares[i]) {
        squares[i] = this.player.value;

        this.setState({squares: squares}); //this triggers a complete rerender it looks like, 
        //it is also queued, so you don't get the info immediately in the object
        //so you need to queue it and then have the state check as step 1 of render or something
        this.player.idx ^= 1;
        this.player.value = this.player.opts[this.player.idx]
    }
    
  }
  render() {
    var status
    if (this.checkVictory() ) {
      status = this.player.value + " wins!";
    } else {
      status = 'Next player: ' + this.player.value;
    }
    var x =
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    
    return (x);
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Landing />,
  document.getElementById('root')
);


