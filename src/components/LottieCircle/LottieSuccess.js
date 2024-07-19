import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assistent/succes lottie.json'; // Update with your path
import './LottieCircle.css';

const LottieSuccess = () => {
  const playerRef = useRef(null);
  const [rotation, setRotation] = useState(0);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       const { clientX, clientY } = e;
//       const { innerWidth, innerHeight } = window;
//       const centerX = innerWidth / 2;
//       const centerY = innerHeight / 2;

//       const deltaX = clientX - centerX;
//       const deltaY = clientY - centerY;

//       const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

//       setRotation(angle);
//     };

//     window.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

  return (
    <div
      ref={playerRef}
      className="lottie-circle"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
          <div style={{ height: '100vh', width: '100vw', margin: 0, padding: 0 }}>
      <Lottie animationData={animationData} style={{ height: '100%', width: '100%' }} />
    </div>
    </div>
  );
};

export default LottieSuccess;