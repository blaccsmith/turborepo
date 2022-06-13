import { whyUsContent } from '@constants';
import NextLink from 'ui/components/atoms/NextLink';

const WhyUs = () => (
  <div className="flex min-h-screen snap-center flex-col items-center justify-center  p-3">
    <h1 className="text-4xl font-medium text-white">Why us?</h1>
    <div className="my-32 grid w-full grid-cols-1 gap-6 md:w-max md:grid-cols-2 md:gap-12">
      {whyUsContent.map(({ heading, subHeading }) => (
        <div
          key={heading}
          className="hover:after:animate-glow relative z-20 flex w-full max-w-[325px] cursor-default flex-col space-y-2 rounded-lg p-4 px-12 text-center shadow-[rgba(91,68,253,0.55)_0px_5px_15px] transition-all duration-200 after:absolute after:top-2 after:left-0 after:right-0 after:-z-[1] after:h-full after:w-full  after:scale-75 after:blur-2xl after:content-['']  hover:scale-105 hover:after:bg-[linear-gradient(137deg,#5ddcff,#5b44fd,#7B61FF)]"
        >
          <h2 className="text-5xl font-bold text-white md:text-6xl">{heading}</h2>
          <p className=" text-xl text-white ">{subHeading}</p>
        </div>
      ))}
    </div>
    <NextLink
      href="https://discord.gg/yafQvrZ8bQ"
      className="hover:border-brand-purple-500 relative h-min rounded-[90px] border border-transparent bg-black/25 px-4 py-3 font-bold text-white backdrop-blur-lg transition-all duration-200 hover:cursor-pointer"
    >
      Join the community
      <span className="animate-glow absolute left-0 h-1/2 w-full bg-[linear-gradient(137deg,#5ddcff,#5b44fd,#7B61FF)] p-4 blur-2xl" />
    </NextLink>
  </div>
);

export default WhyUs;
