import { whyUsContent } from '@constants';

const WhyUs = () => (
  <div className="min-w-screen flex min-h-screen snap-center items-center justify-center p-3">
    <div className="flex flex-col items-center">
      <h1 className="mb-40 text-4xl font-medium text-white">Why us?</h1>
      <div className="grid w-full grid-cols-2 grid-rows-2 gap-10 md:gap-20">
        {whyUsContent.map(({ heading, subHeading }) => (
          <div className="relative z-20 shadow-[rgba(91,68,253,0.55)_0px_5px_15px] transition-all duration-200 after:absolute after:top-2 after:left-0 after:right-0 after:-z-[1] after:h-full after:w-full after:scale-75  after:blur-2xl after:content-[''] hover:scale-105  hover:after:animate-glow hover:after:bg-[linear-gradient(137deg,#5ddcff,#3c67e3_43%,#4e00c2)]">
            <div
              key={heading}
              className="flex w-full flex-col rounded-sm bg-[#212121] text-center md:w-40"
            >
              <h2 className="text-5xl font-bold text-white md:text-6xl">{heading}</h2>
              <p className=" text-xl text-white ">{subHeading}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default WhyUs;
