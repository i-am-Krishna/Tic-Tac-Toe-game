import './App.css';
import {Board} from './Components/Board';
import { useState } from 'react';
import { ScoreBoard } from './Components/ScoreBoard';
import { ResetButton } from './Components/ResetButton';

function App() {

const win = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6]
]

  const [board,setBoard] = useState(Array(9).fill(null))
   const [xPlaying,setXPlaying] = useState(true);

   const [score,setScore] = useState({xScore:0 , oScore:0 });

    const [gameOver,setGameOver] = useState(false);




  const handleBox = (boxIndex)=>{
    const updateBoard = board.map((value,ind)=>{
      if(ind === boxIndex){
        return xPlaying === true ? "X" : "O" ;
      }
      else{
        return value ;
      }
  })
  const winner = checkWinner(updateBoard)
  if(winner === "O"){
    let {oScore} = score ;
    oScore += 1 ;
    setScore({...score,oScore})
  }
  else if(winner === "X"){
    
    let {xScore} = score ;
    xScore += 1 ;
    setScore({...score,xScore})
  }
  setBoard(updateBoard)
  setXPlaying(!xPlaying)
  }

const checkWinner =(board)=>{
  for(let i=0 ; i< win.length ; i++){
    const [x,y,z] = win[i];

    if(board[x]&&board[x] === board[y]&&board[y]===board[z]){
setGameOver(true)
      return board[x]
    }
    
  }
}

const resetBoard = ()=>{
  setGameOver(false)
  setBoard(Array(9).fill(null))
}

  return (
    <div className="App"> 
    <ScoreBoard score={score} xPlaying={xPlaying}/>
    <Board board={board} onClick={gameOver ? resetBoard : handleBox}/>
    <ResetButton resetBoard={resetBoard}/>
    </div>
  );
}

export default App;
