// src/components/Circle.js
import React from 'react';
import './Circle.css';

const Circle = ({ x, y }) => {
  return (
    <div className="circle" style={{ left: x, top: y }} />
  );
};

export default Circle;
