import { lines } from "./constants";
export const CalculateWinner = (boardToCheck)=>{
  
      for (let i = 0; i< lines.length; i++){
        const [a, b, c] = lines[i];
        if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
            return boardToCheck[a];
          }
        }
        return null;
      }


 export const checkEndGame=(newBoard)=>{
  return newBoard.every((square) => square !== null)
}