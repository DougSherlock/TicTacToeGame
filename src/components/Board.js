import React, { Component } from 'react'
import Square from './Square';
import '../App.css';

const initialState = {
    player: 0,
    winner: null,
    full: false,
    board: [
        ['','',''],
        ['','',''],
        ['','','']
    ],
}    


export default class Board extends Component {
    constructor(props) {
        super();
        this.state = initialState;
    }
    isFull = () => {
        for (let row of this.state.board) {
            for (let square of row) {
                if (square === '') {
                    return false;
                }
            }
        }

        return true;
    }
    checkBoard = () => {
        const triplets = [
            // horiz
            [[0,0],[0,1],[0,2]],
            [[1,0],[1,1],[1,2]],
            [[2,0],[2,1],[2,2]],

            // vert
            [[0,0],[1,0],[2,0]],
            [[0,1],[1,1],[2,1]],
            [[0,2],[1,2],[2,2]],

            // diag
            [[0,0],[1,1],[2,2]],
            [[0,2],[1,1],[2,0]],
        ];
        
        for (let triplet of triplets) {
            const cell0 = triplet[0];
            const val0 = this.state.board[cell0[0]][cell0[1]];
            const cell1 = triplet[1];
            const val1 = this.state.board[cell1[0]][cell1[1]];
            const cell2 = triplet[2];
            const val2 = this.state.board[cell2[0]][cell2[1]];
            if (val0 !== ''
                && val0 === val1
                && val1 === val2) {
                    const result = `winner is ${val0}`;
                    console.log(result)
                    //alert(result);
                    this.setState({winner: val0});
                    return;  
            } 
        }
        
        if (this.isFull()) {
            this.setState({full: true});            
        }
    }
    onBoardClick = (row, col) => {
        console.log(`onBoardClick row${row}, col:${col}`);
        if (this.state.board[row][col] !== '') {
            console.log(`onBoardClick row${row}, col:${col} is already occupied`);
            return;
        }
        const newBoard = this.state.board.map((arr) => {
            return [...arr];
        });
        newBoard[row][col] = this.state.player % 2 ? '0' : 'X'
        console.log(this.state.player)
        this.setState({ 
            board: newBoard, 
            player: (this.state.player + 1) % 2
        })
    }
    resetBoard = () => {
        this.setState(initialState)
    }
    componentDidUpdate() {
        if (this.state.winner === null
            && !this.state.full) {
                this.checkBoard();
        }
    }
    render() {
        console.log(this.state.board);
        return (
            <div className="Board">
                {
                    this.state.board.map((row, rowIndex) => {                        
                        return <div key={rowIndex}>
                            {
                            row.map((cell, colIndex) => {
                                return <Square key={colIndex} value={cell} rowIndex={rowIndex} colIndex={colIndex} onBoardClick={this.onBoardClick} />
                            })
                            }
                        </div>
                    })

                }
                <button onClick={this.resetBoard}>Reset</button>
                {
                    this.state.full ? <div>The cat won this game</div> :
                        this.state.winner && <div>{this.state.winner} is the winner</div>
                }
                
            </div>
        )
    }
}

