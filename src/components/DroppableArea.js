import React from 'react';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

const DroppableArea = ({ id, left, top, onDrop, className = '', customStyles = {} }) => {
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
      className={`droppable-area ${className}`}
      style={{
        left: `${left}px`,
        top: `${top}px`,
        ...customStyles,  // Appliquer les styles personnalisés
        backgroundColor: isOver ? 'rgba(1,14,31,0.2)' : customStyles.backgroundColor || 'rgba(255, 255, 255, 0.5)',
      }}
    />
  );
};

DroppableArea.propTypes = {
  id: PropTypes.string.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  onDrop: PropTypes.func.isRequired,
  className: PropTypes.string,
  customStyles: PropTypes.object,  // Ajouter les styles personnalisés
};

export default DroppableArea;
