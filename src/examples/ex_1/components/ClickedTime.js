import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const CurrentDate=()=>{
  let date_ob = new Date();
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);  
  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);  
  // current year
  let year = date_ob.getFullYear();  
  // current hours
  let hours = date_ob.getHours();  
  // current minutes
  let minutes = date_ob.getMinutes();  
  // current seconds
  let seconds = date_ob.getSeconds();  
  // prints date & time in YYYY-MM-DD HH:MM:SS format
 let cuurrentDate =`${year}/${month}/${date} ${hours}:${minutes}:${seconds}`;
 return cuurrentDate;
  
}

const ClickedTime = () => {

  const {counter} = useSelector(state => state.counter);

  useEffect(() => {
    const randomHex = '#' + Math.floor(Math.random() * 16777215).toString(16)
    document.querySelector(".ClickedTime").style.color = randomHex
  }, [counter]);

  return (
    <>
      <h3 className="ClickedTime">Counter Last Changed At [{CurrentDate()}]</h3>
    </>
  )
}

export default ClickedTime