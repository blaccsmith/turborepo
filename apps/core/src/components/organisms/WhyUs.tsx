import { whyUsContent } from '@constants';

const WhyUs = () => (
  <div className="min-w-screen flex min-h-screen snap-center items-center justify-center">
    <div className="flex flex-col items-center">
      <h1 className="mb-40 text-4xl font-medium text-white">Why us?</h1>
      <div className="grid w-full grid-cols-2 grid-rows-2 gap-20">
        {whyUsContent.map(({ heading, subHeading }) => (
          <div
            key={heading}
            className="after:translate-[transform:translateZ(50px)] -z-[2] flex w-40 animate-glow flex-col rounded-sm bg-brand-black text-center shadow-[0_0_0_1px_rgba(255,255,255,.01)] transition-all duration-200
              after:absolute after:top-3.5
              after:left-0
              after:right-0 after:h-full after:w-full after:scale-90 after:bg-[linear-gradient(to_left,#ff5770,#e4428d,#FFF000)] after:bg-[length:200%_100%] after:blur-lg"
          >
            <h2 className="text-6xl font-bold text-white">{heading}</h2>
            <p className="text-xl text-white ">{subHeading}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default WhyUs;
