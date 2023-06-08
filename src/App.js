import './App.css';
import JsSIP from 'jssip'; //thêm cái này

import React, { useState } from 'react';

function Numpad() {
  const [session, setSession] = useState(null);//thêm cái này
  const [inputValue, setInputValue] = useState("");

  const handleInput = (value) => {
    setInputValue(inputValue + value);
  }

  const handleDelete = () => {
    setInputValue(inputValue.slice(0, -1));
  }
  

    
  

  function handleHangup() {
    if (session) {
      session.terminate(); // Gọi phương thức terminate() trên đối tượng session
      
      setSession(null);
      
    }
  }

  
  
  

  
  
  
  //thêm xử lý khi ấn nút Call
  const handleCall = (inputValue) => {
    const phoneNumber = inputValue; // inputValue là số điện thoại nhập vào từ bàn phím, khi ấn nút call này thì sdt gán vào biến "phoneNumber" 

    const socket = new JsSIP.WebSocketInterface('wss://gc03-pbx.tel4vn.com:7444');//thay đổi này thành socket của Gcalls
    const configuration = {
        sockets: [socket],
        uri: 'sip:101@2-test1.gcalls.vn:50061',
        password: 'test1101',
    };
    const userAgent = new JsSIP.UA(configuration);

    userAgent.start();

    const callSession = userAgent.call(phoneNumber); 
    setSession(callSession); //call tới số điện thoại:"phoneNumber"

    callSession.on('connecting', () => {
        console.log('Connecting...');
        console.log('đang kết nối đến:'+ phoneNumber);
    });

    callSession.on('accepted', () => {
      console.log('Connected');
    });

    callSession.on('ended', () => {
      console.log('Kết thúc cuộc gọi');
    });

    callSession.on('failed', () => {
      console.log('Kết thúc cuộc gọi');
    });

    callSession.connection.addEventListener('addstream', (e) => {
        const audio = new Audio();
        audio.srcObject = e.stream;
        audio.play();
    });
  };

  return (
    <div className="numpad">
      <div className="input">{inputValue}</div>
      <div className="row">
        <button onClick={() => handleInput("1")}>1</button>
        <button onClick={() => handleInput("2")}>2</button>
        <button onClick={() => handleInput("3")}>3</button>
      </div>
      <div className="row">
        <button onClick={() => handleInput("4")}>4</button>
        <button onClick={() => handleInput("5")}>5</button>
        <button onClick={() => handleInput("6")}>6</button>
      </div>
      <div className="row">
        <button onClick={() => handleInput("7")}>7</button>
        <button onClick={() => handleInput("8")}>8</button>
        <button onClick={() => handleInput("9")}>9</button>
      </div>
      <div className="row">
        <button className="clear" onClick={() => handleDelete()}>Delete</button>
        <button className="zero" onClick={() => handleInput("0")}>0</button>
       <button onClick={() => handleCall(inputValue)}>Call</button> {/* Thay đổi chỗ này! Khi ấn vào nút Call thì Onclick sẽ gọi hàm handleCall với tham số là inputValue(số điện thoại) */}
      </div>
      <div className="row">
        <button className="end" onClick={ () => handleHangup()}> End</button>
      </div>
    </div>
  );
}

export default Numpad;
