"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import createGlobe, { COBEOptions } from "cobe";
import { useSpring } from "react-spring";

import { cn } from "@/lib/utils";

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [{ location: [56.4299503, 10.6746282], size: 0.1 }],
};

type GlobeState = {
  phi: number;
  width: number;
  height: number;
  [key: string]: any;
};

export default function GlobeComponent({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const phi = 4.5;
  const [width, setWidth] = useState(0); // Track width with useState
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  // Disable rule for this line
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updatePointerInteraction = (value: any) => {
    pointerInteracting.current = value;
    canvasRef.current!.style.cursor = value ? "grabbing" : "grab";
  };

  // Disable rule for this line
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateMovement = (clientX: any) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      api.start({ r: delta / 200 });
    }
  };

  const onRender = useCallback(
    (state: Record<string, any>) => {
      const globeState = state as GlobeState; // Safe casting
      globeState.phi = phi + r.get();
      globeState.width = width * 2;
      globeState.height = width * 2;
    },
    [phi, r, width] // Add width to dependencies
  );

  const onResize = useCallback(() => {
    if (canvasRef.current) {
      setWidth(canvasRef.current.offsetWidth); // Update width using setWidth
    }
  }, []); // No need for dependencies here since it doesn't rely on external values

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    });

    setTimeout(() => (canvasRef.current!.style.opacity = "1"));
    return () => globe.destroy();
  }, [config, onRender, onResize, width]); // Add necessary dependencies

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className
      )}
    >
      <canvas
        className={cn(
          "h-full w-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
