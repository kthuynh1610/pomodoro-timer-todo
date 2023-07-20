import { useEffect, useState } from 'react';
import './App.css';
import BreakSound from '../src/Sound/breakSound.mp3';

let red = '#BA4949';
let blue = "#397097";
function App() {
const [second, setSecond] = useState(0);
const [minute, setMinute] = useState(45);
const [timerOn, setTimerOn] = useState(true);
const [isActive, setIsActive] = useState(false);
const [active, setActive] = useState(true);
const [bgColor, setBgColor] = useState(red);
const audio = new Audio(BreakSound);
useEffect(()=>{
  let internal = null;
  if(!timerOn){
    internal = setInterval(()=>{
      if(minute==45){
        setMinute(minute-1);
        setSecond(59);
        clearInterval(internal)
      }if(second==59||second<59){
        setSecond(second-1);
        clearInterval(internal);
      }if(second==0){
        setMinute(minute-1);
        setSecond(59);
        clearInterval(internal);
      }if(minute==0 && second==0){
        setTimerOn(true);
        setMinute(0);
        setSecond(0);
        audio.play();
      }
    },1000)
  }else{
    clearInterval(internal);
  }
  return()=>{
    clearInterval(internal);
  }
})
const handleStart = () =>{
  setTimerOn(false);
  setIsActive(true);
}
const Stop = () =>{
  setTimerOn(true);
  setIsActive(false);
}
const handlePomo =()=>{
  setTimerOn(false);
  setMinute(45);
  setBgColor(red);
  Stop();
  setActive(true);
}
const handleBreak=()=>{
  setTimerOn(false);
  setMinute(5);
  setSecond(0);
  setBgColor(blue);
  Stop();
  setActive(false);
}
  return (
    <div className="App" style={{background: bgColor, transition:'background 0.5s ease'}}>
      <h1>Pomodoro Clock</h1>
      <div className='container'>
        <div className='Section'>
          <p
          className={active? "active" : null} 
          onClick={handlePomo}
          >
            Pomodoro</p>
          <p
          className={active? null : "active"}
          onClick={handleBreak}
          >
            Short Break</p>
        </div>
        <div className='Clock'>
            <p>{minute < 10 ? "0" + minute : minute} :  {second < 10 ? "0" + second : second}</p>
        </div>
        <div>{isActive? <button onClick={Stop}>Stop</button> : <button onClick={handleStart}>Start</button>}
        </div>
      </div>
    </div>
  );
}

export default App;
