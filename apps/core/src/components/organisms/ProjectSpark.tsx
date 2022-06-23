import React from 'react';
import NextImage from 'ui/components/atoms/NextImage';
import tribe from 'ui/assets/tribe.png';

const ProjectSpark = () => (
  <div className="flex h-screen flex-col items-center justify-center text-white">
    <NextImage objectFit="cover" className="z-10 rounded-xl" alt="jumbotron image" src={tribe} />
    <div className="flex w-full scale-105 p-4" />
  </div>
);

export default ProjectSpark;
