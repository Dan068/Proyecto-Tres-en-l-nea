import { useState } from "react";
import confetti from 'canvas-confetti'

import Square from './Square'
import {CalculateWinner, checkEndGame} from "./CalculateWinner";
import { TURNS } from "./constants";
import { WinnerModal } from "./WinnerModal";


function Board (){
  const [board, setBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem('board')
    if(boardFromStorage) return JSON.parse(boardFromStorage)
      return Array(9).fill(null)
  });

  const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage?? TURNS.X
  });



  const [winner, setWinner] = useState(null)

  const restart =()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
    
  }



     const updateBoard=(i)=>{
      if(board[i] || winner) return

      const newBoard =[...board]
      newBoard[i] = turn
      setBoard(newBoard)

      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
      setTurn(newTurn)

      window.localStorage.setItem('board', JSON.stringify(newBoard));
      window.localStorage.setItem('turn', newTurn);

      const newWinner= CalculateWinner(newBoard)
      if(newWinner){
        confetti()
        setWinner(newWinner)
      } else if( checkEndGame(newBoard)){
        setWinner(false)
      }
     }
  

    return(
        <>
        <div className="board">
          <h1>Tic tac toe</h1>
          <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <button onClick={restart}>Reset del juego</button>
      <WinnerModal restart={restart} winner={winner} />   
         
          </div>
        </>
    )
}
export default Board