import type { NextPage } from 'next';
import Landing from '@components/organisms/Landing';
import Pillars from '@components/organisms/Pillars';
import WhyUs from '@components/organisms/WhyUs';
import Testimonials from '@components/organisms/Testimonials';
import ProjectSpark from '@components/organisms/ProjectSpark';
import Script from 'next/script';

const Home: NextPage = () => (
  <div className="relative h-auto w-auto bg-[#212121]">
    <ProjectSpark />
    <Landing />
    <Pillars />
    <WhyUs />
    <Testimonials />
    <Script
      async
      defer
      data-website-id="e375e4f2-5380-4f39-8ee1-c64ba5b374cc"
      src="https://core.up.railway.app/umami.js"
    />
  </div>
);

export default Home;
