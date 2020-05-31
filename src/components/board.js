import React from 'react';
import Square from './square.js';

class Board extends React.Component {
    highlightSquare(squaresToBeHighlighted, squareNumber) {
        if (squaresToBeHighlighted) {
            for (let i = 0; i < squaresToBeHighlighted.length; i++) {
                if (squaresToBeHighlighted[i] === squareNumber) {
                    return true;
                }
            }
        }
        return false;
    }

    renderSquare(c, r) {
        const i = c + r;
        return <Square
            key={i}
            value={this.props.squares[i]}
            highlight={this.highlightSquare(this.props.squaresToBeHighlighted, i)}
            onClick={() => this.props.onClick(c, r, i)}
        />;
    }

    renderBoardRow(r) {
        let boardRowContent = [];
        for (let c = 0; c < 3; c++) {
            boardRowContent.push(this.renderSquare(c, r));
        }
        return <div className="board-row">{boardRowContent}</div>;
    }

    renderBoard() {
        let boardContent = [];
        for (let r = 0; r < 9; r = r + 3) {
            boardContent.push(this.renderBoardRow(r));
        }
        return <div>{boardContent}</div>;
    }

    render() {
        return this.renderBoard();
    }
}


export default Board;
