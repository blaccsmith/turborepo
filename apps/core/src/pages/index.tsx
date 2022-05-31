import type { NextPage } from 'next';
import Landing from '@components/organisms/Landing';
import Pillars from '@components/organisms/Pillars';
import WhyUs from '@components/organisms/WhyUs';

const Home: NextPage = () => (
  <div className="h-full w-auto bg-[#212121]">
    <Landing />
    <Pillars />
    <WhyUs />
  </div>
);

export default Home;
