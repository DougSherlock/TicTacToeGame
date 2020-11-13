import React from 'react'
import '../App.css';

export default function Square({value, rowIndex, colIndex, onBoardClick, winningCell}) {
    const onSquareClick = (rowIndex, colIndex) => {
        console.log(`onSquareClick row:${rowIndex}, col:${colIndex}`)
        onBoardClick(rowIndex, colIndex)
    }
    let clsName = "Square"
    if (winningCell === true) {
        clsName +=  " winningCell"
    }

    return (
        <span className={clsName} onClick={() => onSquareClick(rowIndex, colIndex)} data-rowindex={rowIndex} data-colindex={colIndex}>
            <span style={{textAlign:'center',verticalAlign:'middle'}}>{value}</span>
        </span>
    )
}
