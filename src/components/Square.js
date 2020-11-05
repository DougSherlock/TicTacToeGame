import React from 'react'
import '../App.css';

export default function Square({value, rowIndex, colIndex, onBoardClick}) {
    const onSquareClick = (rowIndex, colIndex) => {
        console.log(`onSquareClick row:${rowIndex}, col:${colIndex}`)
        onBoardClick(rowIndex, colIndex)
    }
    return (
        <span className="Square" onClick={() => onSquareClick(rowIndex, colIndex)} data-rowindex={rowIndex} data-colindex={colIndex}>
            <span style={{textAlign:'center',verticalAlign:'middle'}}>{value}</span>
        </span>
    )
}
