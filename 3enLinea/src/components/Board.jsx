import { useState } from "react";
import Square from './Square'
import CalculateWinner from "./CalculateWinner";
import confetti from 'canvas-confetti'

const TURNS ={
  X:'X',
  O : 'O'
}

function Board (){
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null)

    const Restart =()=>{
      setBoard(Array(9).fill(null))
      setTurn(TURNS.X)
      setWinner(null)
      
    }
    const checkEndGame=(newBoard)=>{
      return newBoard.every((square) => square !== null)
    }


     const updateBoard=(i)=>{
      if(board[i] || winner) return

      const newBoard =[...board]
      newBoard[i] = turn
      setBoard(newBoard)

      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
      setTurn(newTurn)

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
      <button onClick={Restart}>Reset del juego</button>

            {winner !== null &&(
              <section className="winner">
                <div className="text">
                  <h2>{
                    winner === false? 'Empate':  'Ganó'
                    }
                    </h2>
                    <header className="win">
                      {winner && <Square>{winner}</Square>}
                    </header>
                    <footer>
                      <button onClick={Restart} >Empezar de nuevo</button>
                    </footer>
                </div>
              </section>
            )} 
        
         
          </div>
        </>
    )
}
export default Board