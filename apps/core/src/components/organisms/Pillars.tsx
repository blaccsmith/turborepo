import { pillars } from '@constants';
import { useEffect, useRef, useState } from 'react';

const Pillars = () => {
  const scrollingContainer = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(0);

  useEffect(() => {
    scrollingContainer.current?.scrollTo({
      top: 207 * pos,
      behavior: 'smooth',
    });
  }, [pos]);

  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="mb-40 text-4xl font-medium text-white">What we&apos;re about</h1>
        <div className="h-4/5 w-4/5">
          {/* HStack */}
          <div className="flex h-full w-full">
            {/* Stack */}
            <div className="relative mr-4 flex w-max flex-col items-end justify-evenly border-r border-slate-400">
              {pillars.map((pillar, idx) => (
                <div
                  key={pillar.label}
                  aria-hidden="true"
                  onClick={() => {
                    setPos(idx);
                  }}
                >
                  <p className="mt-2 pr-2 text-4xl text-slate-300 hover:text-purple-400">
                    {pillar.label}
                  </p>
                  <div className="absolute top-0 right-0 h-full w-0.5 bg-[#909090]" />
                </div>
              ))}
              <div
                className={`absolute top-${
                  pos === 0 ? '0' : `[${pos * 33}%]`
                } h-2/6 w-0.5 bg-purple-400 transition-all duration-500`}
              />
            </div>
            {/* Stack */}
            <div className="h-[207px] overflow-y-hidden" ref={scrollingContainer}>
              {pillars.map(pillar => (
                <div key={pillar.heading} className="h-[207px] px-4">
                  <h2 className="text-4xl text-white">{pillar.heading}</h2>
                  <p className="text-xl text-white">{pillar.description}</p>
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
