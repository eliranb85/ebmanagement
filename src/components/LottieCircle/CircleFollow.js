import React, { useEffect, useRef, useState } from 'react';
import './LottieCircle.css';

const CircleFollow = () => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const centerX = innerWidth / 2;
      const centerY = innerHeight / 2;

      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;

      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

      setRotation(angle);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="circle-container"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="circle"></div>
    </div>
  );
};

export default CircleFollow;
