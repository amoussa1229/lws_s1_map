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
    Array(GRID_SIZE * GRID_SIZE).fill(null)
  );
  const [isMouseDown, setIsMouseDown] = useState(false);

  const applyAllianceToTile = (index) => {
    if (selectedAlliance !== null) {
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        // Toggle assignment: unassign if already set to the selected alliance
        if (newGrid[index] === selectedAlliance) {
          newGrid[index] = null;
        } else {
          newGrid[index] = selectedAlliance;
        }
        return newGrid;
      });
    }
  };

  const handleMouseDown = (index) => {
    setIsMouseDown(true);
    applyAllianceToTile(index);
  };

  const handleMouseEnter = (index) => {
    if (isMouseDown) {
      // No toggling on drag — only assign if different
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        if (selectedAlliance !== null && newGrid[index] !== selectedAlliance) {
          newGrid[index] = selectedAlliance;
        }
        return newGrid;
      });
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

  const clearAllTiles = () => {
    setGrid(Array(GRID_SIZE * GRID_SIZE).fill(null));
  };

  return (
    <div className="App" onMouseUp={handleMouseUp}>
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

      <button onClick={clearAllTiles} style={{ marginTop: 10 }}>
        🧹 Clear All
      </button>

      <div className="grid">
        {grid.map((allianceIndex, i) => {
          const alliance = allianceIndex !== null ? alliances[allianceIndex] : null;
          const backgroundColor = alliance ? alliance.color : DEFAULT_COLOR;
          const title = alliance ? alliance.name : 'Unassigned';
          return (
            <div
              key={i}
              className="tile"
              title={title}
              onMouseDown={() => handleMouseDown(i)}
              onMouseEnter={() => handleMouseEnter(i)}
              style={{ backgroundColor }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;

