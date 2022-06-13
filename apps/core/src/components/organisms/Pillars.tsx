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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Stack */}
            <div className="relative flex w-full items-end border-r-[#909090] md:flex-col md:border-r md:border-b-0">
              {pillars.map((pillar, idx) => (
                <div key={pillar.label} className="h-full px-2 md:py-3 md:px-0">
                  <div
                    aria-hidden="true"
                    className={classNames(
                      pos === idx
                        ? 'text-brand-purple-400'
                        : 'hover:text-brand-purple-200 text-slate-300',
                      'flex h-full cursor-pointer items-center align-top md:pr-4 md:align-bottom md:text-4xl',
                    )}
                    onClick={() => setPos(idx)}
                  >
                    {pillar.label}
                  </div>
                </div>
              ))}
              <div
                className={classNames(
                  pos === 0 ? 'left-0 w-[87px] md:top-0 md:left-full' : '',
                  pos === 1 ? 'left-1/3 w-[123px] md:top-1/3 md:left-full' : '',
                  pos === 2 ? 'left-2/3 w-[168px] md:top-2/3 md:left-full' : '',
                  'bg-brand-purple-400 absolute hidden h-0.5 transition-all duration-500 md:block md:h-1/3 md:w-0.5',
                )}
              />
            </div>
            {/* Stack */}
            <div className="flex items-center overflow-x-hidden ">
              <p className="font-light text-center text-white md:text-xl">{pillars[pos].description}</p>
            </div>
            {/* <div
              className="flex h-auto w-[342px] origin-center overflow-x-hidden  md:block md:h-[207px] md:w-full md:overflow-y-hidden"
              ref={scrollingContainer}
            >
              {pillars.map((pillar, idx) => (
                <div
                  key={pillar.description}
                  className={classNames(
                    pos === idx ? 'animate-fadeIn' : 'animate-fadeOut',
                    'flex h-full min-w-[calc(100vw-3rem)] items-center space-y-3 px-4 md:h-[207px] md:w-full md:min-w-full',
                  )}
                >
                  <h2 className="text-3xl font-medium text-white md:text-4xl">{pillar.heading}</h2>
                  <p className="text-base font-light text-white md:text-xl">{pillar.description}</p>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pillars;
