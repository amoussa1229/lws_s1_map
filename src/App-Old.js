import React, { useState } from 'react';
import './App.css';

const GRID_SIZE = 10;
const DEFAULT_COLOR = '#d2a679'; // original tile color

// Example alliance colors
const alliances = [
  { name: 'Alliance A', color: '#4CAF50' },
  { name: 'Alliance B', color: '#2196F3' },
  { name: 'Alliance C', color: '#FFC107' },
  { name: 'Alliance D', color: '#9C27B0' },
  { name: 'Alliance E', color: '#F44336' },
];

function App() {
  const [selectedAlliance, setSelectedAlliance] = useState(null);
  const [grid, setGrid] = useState(
    Array(GRID_SIZE * GRID_SIZE).fill(DEFAULT_COLOR)
  );

  const handleTileClick = (index) => {
    if (selectedAlliance !== null) {
      const newGrid = [...grid];
      newGrid[index] = alliances[selectedAlliance].color;
      setGrid(newGrid);
    }
  };

  return (
    <div className="App">
      <h2>Select an Alliance</h2>
      <div className="alliance-buttons">
        {alliances.map((a, i) => (
          <button
            key={i}
            style={{ backgroundColor: a.color, color: '#fff', marginRight: 10 }}
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
            onClick={() => handleTileClick(i)}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

