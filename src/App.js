import './App.css';

import React, { useState } from 'react';

function Numpad(props) {
  const [inputValue, setInputValue] = useState("");

  // hàm xử lý sự kiện khi người dùng nhấn một phím số
  const handleInput = (value) => {
    setInputValue(inputValue + value);
  }

  // hàm xử lý sự kiện khi người dùng nhấn phím xóa
  const handleDelete = () => {
    setInputValue(inputValue.slice(0, -1));
  }

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
        <button onClick={() => handleDelete()}>Delete</button>
        <button onClick={() => handleInput("0")}>0</button>
        <button onClick={() => props.onSubmit(inputValue)}>Call</button>
      </div>
    </div>
  );
}

export default Numpad;