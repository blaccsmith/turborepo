import type { NextPage } from 'next';

const Home: NextPage = () => (
  <div className='w-full h-full bg-black'>
    <div className='w-screen h-screen p-6'>
    {/* Stack */}
    <div className='flex flex-col w-1/2 justify-evenly h-403'>
      <h1 className='text-white font-bold text-5xl leading-3.25'>A global community for you, built by people like you.</h1>
      <h2 className='text-white text-xl '>Now that we know who you are, I know who I am. I&apos;m not a mistake! It all makes sense!</h2>
    </div>
    </div>
  </div>
);

export default Home;
