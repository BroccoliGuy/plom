import React from 'react';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

const DroppableArea = ({ id, left, top, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'symbol',
    drop: (item) => onDrop(item.id, id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className="droppable-area"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        position: 'absolute',
        backgroundColor: isOver ? 'lightgreen' : 'rgba(255, 255, 255, 0.5)',
      }}
    />
  );
};

DroppableArea.propTypes = {
  id: PropTypes.string.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  onDrop: PropTypes.func.isRequired,
};

export default DroppableArea;
