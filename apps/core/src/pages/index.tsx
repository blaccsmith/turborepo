import type { NextPage } from 'next';
import Landing from '@components/organisms/Landing';
import Pillars from '@components/organisms/Pillars';
import WhyUs from '@components/organisms/WhyUs';
import Testimonials from '@components/organisms/Testimonials';

const Home: NextPage = () => (
  <div className="relative h-auto w-auto bg-[#212121]">
    <Landing />
    <Pillars />
    <WhyUs />
    <Testimonials />
  </div>
);

export default Home;
