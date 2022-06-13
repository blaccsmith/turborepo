import React from 'react';
import NextImage from 'ui/components/atoms/NextImage';
import questions from 'ui/assets/qa.png';

const ProjectSpark = () => (
  <div className="flex h-screen snap-center flex-col items-center justify-center text-white">
    <NextImage
      objectFit="cover"
      className="z-10 rounded-xl"
      alt="jumbotron image"
      src={questions}
    />
    <div className="after:animate-glow flex w-full scale-105 p-4 after:absolute after:-top-full after:left-0 after:right-0 after:-z-[1] after:h-full  after:w-full after:scale-75 after:bg-[linear-gradient(137deg,#5ddcff,#5b44fd,#7B61FF)]  after:blur-2xl after:content-['']" />
  </div>
);

export default ProjectSpark;
