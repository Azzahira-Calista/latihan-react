import React, { useState } from 'react';
import './App.css';

function App() {
  const [number, setNumber] = useState(0);
  const [boxes, setBoxes] = useState([]);
  const [usedNumbers, setUsedNumbers] = useState(new Set());

  const handleInputChange = (e) => {
    setNumber(parseInt(e.target.value));
  };

  const handleGenerateClick = () => {
    if (!isNaN(number) && number > 0) {
      const initialBoxes = Array.from({ length: number }, (_, i) => ({
        value: i + 1,
        color: '#ffffff', 
      }));
      setBoxes(initialBoxes);
      setUsedNumbers(new Set());
    } else {
      setBoxes([]);
    }
  };

  const handleBoxClick = (index) => {
    const uniqueNumbers = generateUniqueRandomNumbers(number);
    const updatedBoxes = [...boxes];
    let newNumber;

    do {
      newNumber = uniqueNumbers.pop();
    } while (usedNumbers.has(newNumber) && uniqueNumbers.length > 0);

    if (newNumber !== undefined) {
      setUsedNumbers(prev => new Set(prev).add(newNumber));
      updatedBoxes[index] = {
        value: newNumber,
        color: getRandomColor(),
      };
      setBoxes(updatedBoxes);
    }
  };

  const generateUniqueRandomNumbers = (max) => {
    const numbers = [];
    while (numbers.length < max) {
      const randomNum = Math.floor(Math.random() * max) + 1;
      if (!numbers.includes(randomNum)) {
        numbers.push(randomNum);
      }
    }
    return numbers;
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="App">
      <div className="input-container">
        <input
          type="number"
          placeholder="Masukkan angka..."
          value={number}
          onChange={handleInputChange}
        />
        <button onClick={handleGenerateClick}>Generate</button>
      </div>
      <div className="box-container">
        {boxes.map((box, index) => (
          <div
            key={index}
            className="box"
            style={{ backgroundColor: box.color }}
            onClick={() => handleBoxClick(index)}
          >
            {box.value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;