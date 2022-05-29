import type { NextPage } from 'next';
import Image from 'next/image';
import homePageImages from '../../constants';

const Home: NextPage = () => (
  <div className="h-full w-full bg-black">
    <div className="flex h-screen w-screen p-6">
      {/* Stack */}
      <div className="flex h-1/2 w-1/2 flex-col justify-center">
        <h1 className="leading-3.25 mb-10 text-5xl font-bold text-white">
          A global community for you, built by people like you.
        </h1>
        <h2 className="mb-5 text-xl text-white">
          Now that we know who you are, I know who I am. I&apos;m not a mistake! It all makes sense!
        </h2>
      </div>
      {/* Grid */}
      <div className="grid h-1/2 grid-cols-3 grid-rows-3 gap-5">
        {homePageImages.map((src: string, idx: number) => idx === 4 || idx === 5 ? (
            <div key={src} className="h-auto w-auto" />
          ) : (
            <div className="relative w-44" key={src}>
              <Image
                src={src}
                alt={`black people in tech #${idx}`}
                width="172px"
                height="172px"
                objectFit="cover"
                style={{
                  filter: 'grayscale(100%)',
                }}
              />
            </div>
          ))}
      </div>
    </div>
  </div>
);

export default Home;
