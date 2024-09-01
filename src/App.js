import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import DraggableSymbol from './components/DraggableSymbol';
import DroppableArea from './components/DroppableArea';
import layoutImg from './assets/layout.png';
import clawImg from './assets/1claw.png';
import eyeImg from './assets/2eye.png';
import fangImg from './assets/3fang.png';
import tearImg from './assets/4tear.png';
import heartImg from './assets/5heart.png';

const SYMBOLS = [
  { id: '1claw', src: clawImg },
  { id: '2eye', src: eyeImg },
  { id: '3fang', src: fangImg },
  { id: '4tear', src: tearImg },
  { id: '5heart', src: heartImg },
];

const CIRCLES = [
  { id: 'circle1', x: 125, y: 175 },
  { id: 'circle2', x: 455, y: 175 },
  { id: 'circle3', x: 540, y: 450 },
  { id: 'circle4', x: 40, y: 450 },
  { id: 'circle5', x: 295, y: 650 },
];

const NUMBERS = [
  { id: 'number1', name: '1', x: 235, y: 285 },
  { id: 'number2', name: '2', x: 455, y: 285 },
  { id: 'number3', name: '3', x: 520, y: 485 },
  { id: 'number4', name: '4', x: 350, y: 615 },
  { id: 'number5', name: '5', x: 175, y: 485 },
];

function App() {
  const [positions, setPositions] = useState(
    SYMBOLS.map((symbol, index) => ({
      ...symbol,
      position: { x: -200, y: 150 + index * 120 }, // Default positions, adjusted for left alignment
    }))
  );

  const handleDrop = (id, circleId) => {
    const circle = CIRCLES.find((c) => c.id === circleId);
    const symbol = SYMBOLS.find((s) => s.id === id);

    if (circle && symbol) {
      setPositions((prevPositions) =>
        prevPositions.map((s) =>
          s.id === id
            ? {
                ...s,
                position: { x: circle.x, y: circle.y },
              }
            : s
        )
      );
    }
  };

  const resetPositions = () => {
    setPositions(
      SYMBOLS.map((symbol, index) => ({
        ...symbol,
        position: { x: -200, y: 150 + index * 120 }, // Default positions, adjusted for left alignment
      }))
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <button onClick={resetPositions} className="reset-button">
          Reset Positions
        </button>
        <div className="hexagon-container">
          <img src={layoutImg} alt="Hexagon Layout" className="hexagon-image" />
          {CIRCLES.map((circle) => (
            <DroppableArea
              key={circle.id}
              id={circle.id}
              left={circle.x}
              top={circle.y}
              onDrop={handleDrop}
            />
          ))}
          {NUMBERS.map((number) => (
            <div
              key={number.id}
              style={{
                position: 'absolute',
                left: `${number.x}px`,
                top: `${number.y}px`,
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              {number.name}
            </div>
          ))}
          <div className="symbols-container">
            {positions.map((symbol) => (
              <DraggableSymbol
                key={symbol.id}
                symbol={symbol}
                left={symbol.position.x}
                top={symbol.position.y}
              />
            ))}
          </div>
          <div className="symbols-horizontal">
            <div className="symbols-order-label">Symbol Order</div>
            {positions.map((symbol) => (
              <div
                key={symbol.id}
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  marginLeft: '10px',
                }}
              >
                <img
                  src={symbol.src}
                  alt={symbol.id}
                  style={{ width: '75%', height: '75%' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
