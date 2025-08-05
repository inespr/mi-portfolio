import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import profileImage from '../assets/profile.jpg';
import logo from '../assets/logo.png';

const RotatingImage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="relative w-48 h-48"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
        animate={{
          rotateY: mousePosition.x * 30,
          rotateX: -mousePosition.y * 30
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          mass: 0.5
        }}
      >
        <motion.img
          src={profileImage}
          alt="Inés Pernil"
          className="w-full h-full rounded-full object-cover border-4 border-accent-pink/20 shadow-lg"
          style={{
            backfaceVisibility: "hidden"
          }}
        />
        <motion.img
          src={logo}
          alt="Logo IP"
          className="absolute inset-0 w-full h-full rounded-full object-cover border-4 border-accent-pink/20 shadow-lg"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
          animate={{
            opacity: isHovered ? 1 : 0
          }}
          transition={{
            duration: 0.3
          }}
        />
      </motion.div>
    </div>
  );
};

export default RotatingImage; 