import React, { useState } from "react";
import "./GridPath.css";
import axios from "axios";

const GridPath = () => {
  const [grid, setGrid] = useState(Array.from({ length: 20 }, () => Array(20).fill(0)));
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [path, setPath] = useState([]);

  const handleClick = (row, col) => {
    if (!start) {
      setStart({ row, col });
    } else if (!end) {
      setEnd({ row, col });
    } else {
      setEnd({ row, col });
    }
  };

  const handleSubmit = async () => {
    if (start && end) {
      try {
        const response = await axios.post("http://localhost:8081/find-path", {
          start,
          end,
          grid
        });
        setPath(response.data.path);
      } catch (error) {
        console.error("Error finding path:", error);
      }
    }
  };

  const handleFindAnotherPath = () => {
    setPath([]);
    setStart(null);
    setEnd(null);
  };

  return (
    <div>
      <h1>Grid Pathfinder</h1>
      <div className="grid">
        {grid.map((row, rowIndex) =>
          row.map((_, colIndex) => {
            const isStart =
              start && start.row === rowIndex && start.col === colIndex;
            const isEnd = end && end.row === rowIndex && end.col === colIndex;

            const isPath = path.some(
              (point, index) => index !== 0 && index !== path.length - 1 && point.row === rowIndex && point.col === colIndex
            );

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`cell ${isStart ? "start" : ""} ${isEnd ? "end" : ""} ${isPath ? "path" : ""}`}
                onClick={() => handleClick(rowIndex, colIndex)}
              />
            );
          })
        )}
      </div>
      <div className="find-button">
        <button onClick={handleSubmit} disabled={!start || !end}>Find Path</button>
        <button onClick={handleFindAnotherPath}>Find Another Path</button>
      </div>
    </div>
  );
};

export default GridPath;
