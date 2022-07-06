import createGlobe from 'cobe';
import { markers } from '@constants';
import React, { useEffect, useRef } from 'react';

const Globe = (): JSX.Element => {
  const globeRef = useRef<HTMLCanvasElement>({} as HTMLCanvasElement);
  const isMobile = () => {
    return window.screen.width < 769 ? 300 : 600;
  };

  useEffect(() => {
    let phi = 0;
    const globe = createGlobe(globeRef.current, {
      devicePixelRatio: 2,
      width: isMobile(),
      height: isMobile(),
      phi: 0,
      theta: 0.15,
      dark: 1,
      diffuse: 0,
      mapSamples: 16000,
      mapBrightness: 3,
      baseColor: [0.33, 0.33, 0.33],
      markerColor: [0.3568627451, 0.2666666667, 0.99],
      glowColor: [0.3568627451, 0.2666666667, 0.99],
      markers,
      onRender: state => {
        globeRef.current.width = isMobile();
        globeRef.current.height = isMobile();

        state.phi = phi;
        phi += 0.005;
      },
    });
    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="flex justify-center">
      <canvas
        ref={globeRef}
        style={{
          width: globeRef.current.width,
          height: globeRef.current.height,
          maxWidth: '100%',
          aspectRatio: '1',
        }}
      />
    </div>
  );
};

export default Globe;
