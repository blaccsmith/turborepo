import { whyUsContent } from '@constants';

const WhyUs = () => (
  <div className="flex min-h-screen snap-center flex-col items-center justify-center  p-3">
    <h1 className="mb-40 text-4xl font-medium text-white">Why us?</h1>
    <div className="grid w-full grid-cols-1 gap-6 md:w-max md:grid-cols-2 md:gap-12">
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
  </div>
);

export default WhyUs;
