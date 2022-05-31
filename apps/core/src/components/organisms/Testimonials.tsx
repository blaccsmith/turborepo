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
    <div className="min-w-screen flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="mb-40 text-4xl font-medium text-white">What people are saying about us</h1>
        <div className="h-4/5 w-11/12">
          <div className="grid grid-cols-3 grid-rows-2 gap-10">
            {testimonals.map(({ text, avatar, handle }, idx) => (
              <div
                className={`relative h-[154px] w-11/12 rounded-lg ${
                  idx % 2 === 0 ? 'bg-[rgba(123,97,255,0.2)]' : ''
                } border-2 border-purple-400 p-9 shadow-[-9px_0px_#7B61FF]`}
                key={handle}
              >
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
                  <p className="text-white ">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

export default Testimonials;
