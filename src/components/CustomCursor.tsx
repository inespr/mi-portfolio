import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.nav-link') ||
        target.closest('.glass-effect')
      ) {
        setIsHoveringInteractive(true);
      } else {
        setIsHoveringInteractive(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed pointer-events-none z-[9999] mix-blend-difference">
      <motion.div
        className="absolute w-6 h-6 rounded-full border-2 border-accent-pink"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? (isHoveringInteractive ? 1.5 : 1) : 0,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{
          type: "tween",
          duration: 0.05
        }}
      />
      <motion.div
        className="absolute w-1 h-1 rounded-full border-2 bg-accent-pink"
        style={{ mixBlendMode: 'normal' }}
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
          scale: isHovering ? (isHoveringInteractive ? 1.5 : 1) : 0,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{
          type: "tween",
          duration: 0.05
        }}
      />
      <motion.div
        className="absolute w-2.5 h-2.5 rounded-full bg-accent-pink"
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: isHovering ? (isHoveringInteractive ? 1.5 : 1) : 0,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{
          type: "tween",
          duration: 0.05
        }}
      />
    </div>
  );
};

export default CustomCursor; 