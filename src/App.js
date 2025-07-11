import React, { useState } from 'react';
import './App.css';

const GRID_SIZE = 10;
const DEFAULT_COLOR = '#d2a679';

function getRandomColor(existingColors) {
  const letters = '0123456789ABCDEF';
  let color;
  do {
    color = '#' + Array.from({ length: 6 }, () =>
      letters[Math.floor(Math.random() * 16)]
    ).join('');
  } while (existingColors.includes(color));
  return color;
}

function App() {
  const [alliances, setAlliances] = useState([]);
  const [newAllianceName, setNewAllianceName] = useState('');
  const [selectedAlliance, setSelectedAlliance] = useState(null);
  const [grid, setGrid] = useState(
    Array(GRID_SIZE * GRID_SIZE).fill(DEFAULT_COLOR)
  );
  const [isMouseDown, setIsMouseDown] = useState(false);

  const applyColorToTile = (index) => {
    if (selectedAlliance !== null) {
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[index] = alliances[selectedAlliance].color;
        return newGrid;
      });
    }
  };

  const handleMouseDown = (index) => {
    setIsMouseDown(true);
    applyColorToTile(index);
  };

  const handleMouseEnter = (index) => {
    if (isMouseDown) {
      applyColorToTile(index);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const addAlliance = () => {
    if (!newAllianceName.trim()) return;
    const existingColors = alliances.map((a) => a.color);
    const color = getRandomColor(existingColors);
    setAlliances([...alliances, { name: newAllianceName.trim(), color }]);
    setNewAllianceName('');
  };

  return (
    <div
      className="App"
      onMouseUp={handleMouseUp} // stop painting anywhere on the page
    >
      <h2>Create a New Alliance</h2>
      <div className="alliance-form">
        <input
          type="text"
          value={newAllianceName}
          onChange={(e) => setNewAllianceName(e.target.value)}
          placeholder="Alliance Name"
        />
        <button onClick={addAlliance}>Add</button>
      </div>

      <h3>Select an Alliance</h3>
      <div className="alliance-buttons">
        {alliances.map((a, i) => (
          <button
            key={i}
            style={{
              backgroundColor: a.color,
              color: '#fff',
              marginRight: 10,
              border: selectedAlliance === i ? '3px solid black' : 'none',
            }}
            onClick={() => setSelectedAlliance(i)}
          >
            {a.name}
          </button>
        ))}
      </div>

      <div className="grid">
        {grid.map((color, i) => (
          <div
            key={i}
            className="tile"
            onMouseDown={() => handleMouseDown(i)}
            onMouseEnter={() => handleMouseEnter(i)}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

