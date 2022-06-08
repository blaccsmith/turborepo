import { whyUsContent } from '@constants';

const WhyUs = () => (
  <div className="min-w-screen flex min-h-screen snap-center items-center justify-center">
    <div className="flex flex-col items-center">
      <h1 className="mb-40 text-4xl font-medium text-white">Why us?</h1>
      <div className="grid w-full grid-cols-2 grid-rows-2 gap-20">
        {whyUsContent.map(({ heading, subHeading }) => (
          <div
            className="after:translate-[transform:translateZ(50px)] relative z-20 p-1 after:absolute  
           after:top-2
          after:left-0
          after:right-0 after:-z-[1] after:h-full after:w-full after:scale-50 after:animate-glow after:bg-[linear-gradient(137deg,#5ddcff,#3c67e3_43%,#4e00c2)] after:blur-2xl"
          >
            <div
              key={heading}
              className="flex w-40 flex-col rounded-sm bg-[#212121] text-center shadow-[0_0_0_1px_rgba(255,255,255,0.2)] "
            >
              <h2 className="text-6xl font-bold text-white">{heading}</h2>
              <p className="text-xl text-white ">{subHeading}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default WhyUs;
