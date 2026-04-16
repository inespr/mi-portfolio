import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    const fill = fillRef.current;
    if (!ring || !dot || !fill) return;

    let visible = false;

    const setScale = (scale: number) => {
      const s = `scale(${scale})`;
      ring.style.transform = `translate(var(--cx), var(--cy)) ${s}`;
      dot.style.transform = `translate(var(--dx), var(--dy)) ${s}`;
      fill.style.transform = `translate(var(--fx), var(--fy)) ${s}`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      ring.style.setProperty('--cx', `${x - 12}px`);
      ring.style.setProperty('--cy', `${y - 12}px`);
      dot.style.setProperty('--dx', `${x - 2}px`);
      dot.style.setProperty('--dy', `${y - 2}px`);
      fill.style.setProperty('--fx', `${x - 5}px`);
      fill.style.setProperty('--fy', `${y - 5}px`);

      ring.style.transform = `translate(${x - 12}px, ${y - 12}px) scale(${visible ? 1 : 0})`;
      dot.style.transform = `translate(${x - 2}px, ${y - 2}px) scale(${visible ? 1 : 0})`;
      fill.style.transform = `translate(${x - 5}px, ${y - 5}px) scale(${visible ? 1 : 0})`;
    };

    const handleMouseEnter = () => {
      visible = true;
      ring.style.opacity = '1';
      dot.style.opacity = '1';
      fill.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      visible = false;
      ring.style.opacity = '0';
      dot.style.opacity = '0';
      fill.style.opacity = '0';
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        !!target.closest('button') ||
        !!target.closest('a');

      const scale = visible ? (isInteractive ? 1.5 : 1) : 0;
      setScale(scale);
    };

    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div className="fixed pointer-events-none z-[9999] mix-blend-difference">
      <div
        ref={ringRef}
        className="absolute w-6 h-6 rounded-full border-2 border-accent-pink opacity-0"
        style={{ top: 0, left: 0, willChange: 'transform', transition: 'transform 0.05s linear, opacity 0.2s' }}
      />
      <div
        ref={dotRef}
        className="absolute w-1 h-1 rounded-full bg-accent-pink opacity-0"
        style={{ top: 0, left: 0, willChange: 'transform', transition: 'transform 0.05s linear, opacity 0.2s' }}
      />
      <div
        ref={fillRef}
        className="absolute w-2.5 h-2.5 rounded-full bg-accent-pink opacity-0"
        style={{ top: 0, left: 0, willChange: 'transform', transition: 'transform 0.05s linear, opacity 0.2s' }}
      />
    </div>
  );
};

export default CustomCursor;
