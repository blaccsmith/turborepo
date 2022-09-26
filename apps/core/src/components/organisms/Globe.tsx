/* eslint-disable no-param-reassign */
import createGlobe from 'cobe';
import { markers } from '@constants';
import React, { useEffect, useRef } from 'react';

const Globe = (): JSX.Element => {
  const globeRef = useRef<any>();

  useEffect(() => {
    let phi = 0;
    let width = 0;

    // eslint-disable-next-line
    const onResize = () => globeRef.current && (width = globeRef.current.offsetWidth);
    window.addEventListener('resize', onResize);
    onResize();

    const globe = createGlobe(globeRef.current, {
      devicePixelRatio: 1,
      width,
      height: width,
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
        state.phi = phi;
        state.width = width;
        state.height = width;
        phi += 0.005;
      },
    });

    // eslint-disable-next-line
    setTimeout(() => (globeRef.current.style.opacity = '1'));
    return () => globe.destroy();
  }, []);

  return (
    <div
      className="flex justify-center"
      style={{
        maxWidth: 600,
        width: '100%',
        aspectRatio: '1',
        margin: 'auto',
        position: 'relative',
      }}
    >
      <canvas
        ref={globeRef}
        style={{
          width: '100%',
          height: '100%',
          transition: 'opacity 1s ease',
          opacity: 0,
        }}
      />
    </div>
  );
};

export default Globe;
