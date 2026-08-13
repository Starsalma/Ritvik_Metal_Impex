import { useEffect, useRef, useState } from 'react';

export default function AnimatedSection({ children, className = '', delay = 0, animation = 'fadeUp' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const animations = {
    fadeUp: {
      initial: { opacity: 0, transform: 'translateY(40px)' },
      animate: { opacity: 1, transform: 'translateY(0)' },
    },
    fadeLeft: {
      initial: { opacity: 0, transform: 'translateX(-40px)' },
      animate: { opacity: 1, transform: 'translateX(0)' },
    },
    fadeRight: {
      initial: { opacity: 0, transform: 'translateX(40px)' },
      animate: { opacity: 1, transform: 'translateX(0)' },
    },
    scaleUp: {
      initial: { opacity: 0, transform: 'scale(0.92)' },
      animate: { opacity: 1, transform: 'scale(1)' },
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
  };

  const style = {
    transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)',
    ...(visible ? animations[animation].animate : animations[animation].initial),
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
