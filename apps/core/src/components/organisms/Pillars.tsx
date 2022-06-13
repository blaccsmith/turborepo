import { pillars } from '@constants';
import { useEffect, useRef, useState } from 'react';
import { classNames } from 'utils/helpers';

const Pillars = () => {
  const scrollingContainer = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (window && window.innerWidth > 768) {
        scrollingContainer.current?.scrollTo({
          top: 207 * pos,
          behavior: 'smooth',
        });
        return;
      }

      scrollingContainer.current?.scrollTo({
        left: scrollingContainer.current.clientWidth * pos,
        behavior: 'smooth',
      });
    }, 500);
  }, [pos]);

  return (
    <div className="min-w-screen flex min-h-screen snap-center items-center justify-center">
      <div className="w-[calc(100vw-3rem) flex flex-col items-center md:w-auto">
        <h1 className="mb-10 text-4xl font-medium text-white md:mb-40">What we&apos;re about</h1>
        <div className="h-4/5 w-full md:w-4/5">
          {/* HStack */}
          <div className="flex h-full flex-col md:flex-row md:space-x-4 ">
            {/* Stack */}
            <div className="relative flex w-full items-end border-r border-r-[#909090] md:flex-col">
              {pillars.map((pillar, idx) => (
                <div key={pillar.label} className="h-full">
                  <div
                    aria-hidden="true"
                    className={classNames(
                      pos === idx ? 'text-purple-500' : 'text-slate-300 hover:text-purple-400',
                      'flex h-full cursor-pointer items-center align-top text-lg md:pr-4 md:align-bottom md:text-4xl',
                    )}
                    onClick={() => setPos(idx)}
                  >
                    {pillar.label}
                  </div>
                </div>
              ))}
              <div
                className={classNames(
                  pos === 0 ? 'left-0 w-[63px] md:top-0 md:left-full' : '',
                  pos === 1 ? 'left-[23%] w-[99px] md:top-[33.3%] md:left-full' : '',
                  pos === 2 ? 'left-[58%] w-[144px] md:top-[66.6%] md:left-full' : '',
                  'absolute h-0.5 bg-purple-500 transition-all duration-500 md:h-1/3 md:w-0.5',
                )}
              />
            </div>
            {/* Stack */}
            <div
              className="flex h-auto w-[342px] origin-center overflow-x-hidden  md:block md:h-[207px] md:w-full md:overflow-y-hidden"
              ref={scrollingContainer}
            >
              {pillars.map((pillar, idx) => (
                <div
                  key={pillar.description}
                  className={classNames(
                    pos === idx ? 'animate-fadeIn' : 'animate-fadeOut',
                    'h-full min-w-[calc(100vw-3rem)] space-y-3 px-4 md:h-[207px] md:w-full md:min-w-full',
                  )}
                >
                  <h2 className="text-3xl font-medium text-white md:text-4xl">{pillar.heading}</h2>
                  <p className="text-base font-light text-white md:text-xl">{pillar.description}</p>
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
