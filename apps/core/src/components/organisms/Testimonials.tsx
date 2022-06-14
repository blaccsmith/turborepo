import NextImage from 'ui/components/atoms/NextImage';
import { classNames } from 'utils';

const testimonals: { text: string; avatar: string; handle: string }[] = [
  {
    text: "It's a unique community and I like some of the answers that I can get",
    avatar: 'https://avatars.githubusercontent.com/u/87236699?v=4',
    handle: 'Diogenes of Toronto',
  },
  {
    text: 'The community is very helpful and no one is judged based on their skilled level.',
    avatar: '',
    handle: 'adamsantana',
  },
];

const Testimonials = () => (
  <div className="min-w-screen flex min-h-screen items-center justify-center pt-40 md:pt-0">
    <div className="flex w-full flex-col items-center">
      <h1 className="mb-20 text-center text-4xl font-medium text-white md:mb-40">
        What people are saying about us
      </h1>
      <div className="flex h-4/5 justify-center md:block md:w-11/12">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:grid-rows-2 md:gap-10">
          {testimonals.map(({ text, avatar, handle }, idx) => (
            <div
              className={`relative rounded-lg ${
                idx % 2 === 0 ? 'bg-[rgba(123,97,255,0.2)]' : ''
              } border-brand-purple-400 flex h-max flex-col space-y-3 border-2 p-6 md:shadow-[-9px_0px_#7B61FF]`}
              key={handle}
            >
              <div className="absolute top-2 left-2">
                <h2 className="text-5xl text-white">“</h2>
              </div>
              <p className="text-white">{text}</p>
              <div className="flex space-x-2">
                <div
                  className={classNames(
                    !avatar
                      ? 'border-brand-purple-500 flex items-center justify-center border text-xs text-white'
                      : '',
                    'relative h-6 w-6 overflow-hidden rounded-full',
                  )}
                >
                  {!avatar ? (
                    <p>{handle[0].toUpperCase()}</p>
                  ) : (
                    <NextImage src={avatar} layout="fill" />
                  )}
                </div>
                <p className="text-white">{handle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Testimonials;
