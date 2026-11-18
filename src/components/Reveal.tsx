import { useEffect, useRef } from 'react';

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export default function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Keep content visible in browsers without IntersectionObserver.
    if (!('IntersectionObserver' in window)) {
      element.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.style.transitionDelay = `${delay}ms`;
          element.classList.add('is-visible');
          observer.unobserve(element);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out opacity-0 translate-y-6 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 ${className}`}
    >
      {children}
    </div>
  );
}
