import React from 'react';
import '../index.css';
import Board from './board.js';
import calculateWinner from '../calculateWinner.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        location: null,
      }],
      stepNumber: 0,
      xIsNext: true,
      squaresToBeHighlighted: Array(3).fill(null),
      movesInAscendingOrder: true,
    };
  }

  toggleOrder() {
    this.setState({
      movesInAscendingOrder: !this.state.movesInAscendingOrder
    });
  }

  handleClick(c, r, i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);
    if (winner[0] || squares[i]) {
      return null;
    }
    const location = '(' + c + ',' + r / 3 + ')';
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        location: location,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  getStatus(squares, winner) {
    let markedSquares = [];
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] !== null) {
        markedSquares[markedSquares.length] = squares[i];
      }
    }
    if (winner) {
      return 'Winner: ' + winner;
    } else if (markedSquares.length === 9) {
      return 'Match drawn';
    } else {
      return 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
  }

  getMovesList(orderedMoves) {
    return this.state.movesInAscendingOrder
      ? <ul>{orderedMoves}</ul>
      : <ul reversed>{orderedMoves}</ul>;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);
    const status = this.getStatus(squares, winner[0]);
    const moves = history
      .map((step, move) => {
        const desc = move
          ? 'Go to move #' + move
          : 'Go to game start';
        return (
          <li key={move}>
            <button className={`${move === this.state.stepNumber ? "highlightLatestMove" : ""}`}
              onClick={() => this.jumpTo(move)}>{desc}</button>{step.location}
          </li>
        );
      });
    const orderedMoves = this.state.movesInAscendingOrder ? moves : moves.reverse();
    const order = this.state.movesInAscendingOrder ? "Descending" : "Ascending";
    return (
      <div>
        <button className="sort-order" onClick={() => this.toggleOrder()}>Sort {order}</button>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              squaresToBeHighlighted={winner[1]}
              onClick={(c, r, i) => this.handleClick(c, r, i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            {this.getMovesList(orderedMoves)}
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
