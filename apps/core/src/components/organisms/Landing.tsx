import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { homePageImages, experienceTitles } from '@constants';

const Landing = (): JSX.Element => (
  <div className="flex h-screen flex-col items-center justify-center snap-center">
    {/* /HStack */}
    <div className="flex items-center justify-center md:h-full">
      {/* Stack */}
      <div className="flex h-full flex-col items-center justify-center text-center md:h-1/2 md:w-1/2 md:items-start md:text-left">
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
      <div className="hidden h-1/2 grid-cols-3 grid-rows-3 gap-3 md:grid">
        {homePageImages.map((src: string, idx: number) =>
          idx === 4 || idx === 5 ? (
            <div key={src} className="h-40 w-40" />
          ) : (
            <div className="relative w-40 overflow-hidden rounded grayscale" key={src}>
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
    <div className="mt-36 w-full flex-col overflow-hidden text-center md:mt-0 md:flex md:flex-row md:justify-start md:text-left">
      <h2 className="text-7xl font-bold text-white">600+</h2>
      {/* Stack */}
      <div className="flex flex-col">
        <h2 className="ml-3 text-xl text-white">People like you: </h2>
        {/* HStack */}
        <div className="flex">
          {experienceTitles.map(title => (
            <div
              className="ml-3 flex h-auto w-auto items-center justify-center bg-[#333333] md:h-9"
              key={title}
            >
              <p className="text-base text-white">{title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Landing;
