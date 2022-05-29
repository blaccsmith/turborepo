import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import homePageImages from '../constants';

const Home: NextPage = () => (
  <div className="h-full w-auto bg-black p-6">
    {/* /Center */}
    <div className="flex h-screen  items-center justify-center">
      {/* Stack */}
      <div className="flex h-1/2 w-1/2 flex-col justify-center">
        <h1 className="leading-3.25 mb-10 text-5xl font-bold text-white">
          A global community for you, built by people like you.
        </h1>
        <h2 className="mb-5 text-xl text-white">
          Now that we know who you are, I know who I am. I&apos;m not a mistake! It all makes sense!
        </h2>
        <Link href="https://discord.gg/yafQvrZ8bQ">
          <div className="flex h-9 w-32 items-center justify-center rounded-[90px] bg-purple-500 hover:cursor-pointer hover:bg-purple-400">
            <p className="text-xs text-black">Join the community</p>
          </div>
        </Link>
      </div>
      {/* Grid */}
      <div className="grid h-1/2 grid-cols-3 grid-rows-3 gap-3">
        {homePageImages.map((src: string, idx: number) =>
          idx === 4 || idx === 5 ? (
            <div key={src} className="h-40 w-40" />
          ) : (
            <div
              className="relative w-40 overflow-hidden rounded grayscale hover:grayscale-0"
              key={src}
            >
              <Image
                src={src}
                alt={`black people in tech #${idx}`}
                width="172px"
                height="172px"
                objectFit="cover"
              />
            </div>
          ),
        )}
      </div>
    </div>
  </div>
);

export default Home;
