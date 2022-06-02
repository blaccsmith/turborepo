import Image from 'next/image';

const testimonals: { text: string; avatar: string; handle: string }[] = [
  {
    text: 'This is such a dope space for me to learn new things',
    avatar: 'https://pbs.twimg.com/profile_images/1462081803745775623/T539s4P6_400x400.jpg',
    handle: '@DBredvick',
  },
  {
    text: 'This is such a dope space for me to learn new things',
    avatar: 'https://pbs.twimg.com/profile_images/1462081803745775623/T539s4P6_400x400.jpg',
    handle: '@DBredvick',
  },
  {
    text: 'This is such a dope space for me to learn new things',
    avatar: 'https://pbs.twimg.com/profile_images/1462081803745775623/T539s4P6_400x400.jpg',
    handle: '@DBredvick',
  },
  {
    text: 'This is such a dope space for me to learn new things',
    avatar: 'https://pbs.twimg.com/profile_images/1462081803745775623/T539s4P6_400x400.jpg',
    handle: '@DBredvick',
  },
  {
    text: 'This is such a dope space for me to learn new things',
    avatar: 'https://pbs.twimg.com/profile_images/1462081803745775623/T539s4P6_400x400.jpg',
    handle: '@DBredvick',
  },
  {
    text: 'This is such a dope space for me to learn new things',
    avatar: 'https://pbs.twimg.com/profile_images/1462081803745775623/T539s4P6_400x400.jpg',
    handle: '@DBredvick',
  },
];

const Testimonials = () => (
  <div className="min-w-screen flex min-h-screen pt-40 md:pt-0 snap-start items-center justify-center">
    <div className="flex w-full flex-col items-center">
      <h1 className="mb-20 text-center text-4xl font-medium text-white md:mb-40">
        What people are saying about us
      </h1>
      <div className="flex h-4/5 justify-center md:block md:w-11/12">
        <div className="grid grid-rows-3 gap-5 md:grid-cols-3 md:grid-rows-2 md:gap-10">
          {testimonals.map(({ text, avatar, handle }, idx) => (
            <div
              className={`relative h-[154px] rounded-lg md:ml-0 md:w-11/12 ${
                idx % 2 === 0 ? 'bg-[rgba(123,97,255,0.2)]' : ''
              } border-2 border-purple-400 p-9 md:shadow-[-9px_0px_#7B61FF]`}
              key={handle}
            >
              <div className="absolute top-5 left-2">
                <h2 className="text-5xl text-white">“</h2>
              </div>
              <div className="absolute bottom-5 left-5 flex">
                <Image
                  src={avatar}
                  layout="fixed"
                  width={24}
                  height={24}
                  style={{
                    borderRadius: '50%',
                  }}
                />
                <p className="ml-2 text-white">{handle}</p>
              </div>
              <div className="w-full">
                <p className="text-white">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Testimonials;
