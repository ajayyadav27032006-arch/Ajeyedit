"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (overlayRef.current) {
      // Entrance animation: Overlay starts visible and slides/fades out
      gsap.fromTo(
        overlayRef.current,
        { scaleY: 1 },
        { 
          scaleY: 0, 
          transformOrigin: "top", 
          duration: 0.7, 
          ease: "power4.inOut" 
        }
      );
    }
  }, [pathname]);

  return (
    <>
      <div 
        ref={overlayRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "var(--background)",
          zIndex: 9998, // just below cursor
          transformOrigin: "bottom"
        }}
      />
      {children}
    </>
  );
}
