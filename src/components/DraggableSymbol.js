import React from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

const DraggableSymbol = ({ symbol, left, top }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'symbol',
    item: { id: symbol.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <img
      ref={drag}
      src={symbol.src}
      alt={symbol.id}
      className="draggable-symbol"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        position: 'absolute',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        zIndex: "1",
      }}
    />
  );
};

DraggableSymbol.propTypes = {
  symbol: PropTypes.object.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
};

export default DraggableSymbol;
