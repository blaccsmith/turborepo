import { whyUsContent } from '@constants';

const WhyUs = () => (
  <div className="min-w-screen flex min-h-screen items-center justify-center snap-center">
    <div className="flex flex-col items-center">
      <h1 className="mb-40 text-4xl font-medium text-white">Why us?</h1>
      <div className="grid w-full grid-cols-2 grid-rows-2 gap-20">
        {whyUsContent.map(({ heading, subHeading }) => (
          <div
            key={heading}
            className="flex w-40 flex-col text-center transition-all duration-200 hover:translate-y-[-9px] hover:translate-x-[-9px] hover:shadow-[6px_6px_rgba(123,97,255,1)]"
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
