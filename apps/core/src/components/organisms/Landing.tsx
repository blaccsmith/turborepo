import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { homePageImages, experienceTitles } from '@constants';

const Landing = (): JSX.Element => (
  <div className="flex h-screen flex-col items-center justify-center">
    {/* /HStack */}
    <div className="flex md:h-full items-center justify-center">
      {/* Stack */}
      <div className="flex h-full text-center md:text-left md:h-1/2 md:w-1/2 flex-col justify-center items-center md:items-start">
        <h1 className="leading-3.25 mb-10 text-5xl font-bold text-white">
          A global community for you, built by people like you.
        </h1>
        <h2 className="mb-5 text-xl text-white">
          Now that we know who you are, I know who I am. I&apos;m not a mistake! It all makes sense!
        </h2>
        <Link href="https://discord.gg/yafQvrZ8bQ" passHref>
          <div className="flex h-9 w-32 items-center justify-center rounded-[90px] bg-purple-500 hover:cursor-pointer hover:bg-purple-400">
            <p className="text-xs text-black">Join the community</p>
          </div>
        </Link>
      </div>
      {/* Grid */}
      <div className="hidden md:grid h-1/2 grid-cols-3 grid-rows-3 gap-3">
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
    {/* HStack */}
    <div className="flex-col text-center md:text-left md:flex overflow-hidden md:flex-row w-full mt-36 md:mt-0 md:justify-start">
      <h2 className="text-7xl font-bold text-white">600+</h2>
      {/* Stack */}
      <div className="flex flex-col">
        <h2 className="ml-3 text-xl text-white">People like you: </h2>
        {/* HStack */}
        <div className="flex">
          {experienceTitles.map(title => (
            <div className="h-auto w-auto ml-3 flex md:h-9 items-center justify-center bg-[#333333]" key={title}>
              <p className="text-base text-white">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Landing;
