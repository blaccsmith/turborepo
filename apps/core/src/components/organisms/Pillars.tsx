import { pillars } from '@constants';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';

const Pillars = () => {
  const scrollingContainer = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(0);
  const scrollBar:string = "absolute h-0.5 md:h-1/4 md:w-0.5 w-1/4 bg-purple-400 transition-all duration-500";
  
  const scrollMobile:string = classNames(scrollBar, {
    'left-0': pos === 0,
    'left-[39%]': pos === 1,
    'left-[75%]': pos === 2,
  });

  const scrollDesktop:string = classNames(scrollBar, {
    'md:top-0 md:left-auto': pos === 0,
    'md:top-[39%] md:left-auto': pos === 1,
    'md:top-[75%] md:left-auto': pos === 2,
  });

  useEffect(() => {
    scrollingContainer.current?.scrollTo({
      top: 207 * pos,
      behavior: 'smooth',
    });
  }, [pos]);

  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="mb-10 md:mb-40 text-4xl font-medium text-white">What we&apos;re about</h1>
        <div className="h-4/5 w-full md:w-4/5">
          {/* HStack */}
          <div className="flex flex-col md:flex-row h-full ">
            {/* Stack */}
            <div className="relative md:mr-4 flex w-full md:flex-col text-center items-end justify-between">
              {pillars.map((pillar, idx) => (
                <div
                  key={pillar.label}
                  aria-hidden="true"
                  onClick={() => {
                    setPos(idx);
                  }}
                >
                  <p className="mt-2 md:pr-2 align-top md:align-bottom text-lg md:text-4xl text-slate-300 hover:text-purple-400">
                    {pillar.label}
                  </p>
                  <div className="absolute bottom-0 left-0 w-full md:top-0 md:right-0 md:h-full md:left-auto md:bottom-auto h-0.5 md:w-0.5 bg-[#909090]" />
                </div>
              ))}
              <div
                className={`${scrollMobile} md:${scrollDesktop}`}
              />
            </div>
            {/* Stack */}
            <div className="h-[207px] overflow-y-hidden" ref={scrollingContainer}>
              {pillars.map(pillar => (
                <div key={pillar.description} className="h-[207px] py-4 md:py-0 md:px-4">
                  <div className="text-center mb-3 md:mb-0">
                    <h2 className="text-3xl md:text-4xl  text-white">{pillar.heading}</h2>
                  </div>
                  <p className="text-base md:text-xl text-white">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pillars;
