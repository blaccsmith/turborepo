import type { NextPage } from 'next';

const Home: NextPage = () => (
	<div className="h-full w-full bg-black">
		<div className="h-screen w-screen p-6">
			{/* Stack */}
			<div className="h-403 flex w-1/2 flex-col justify-evenly">
				<h1 className="leading-3.25 text-5xl font-bold text-white">
					A global community for you, built by people like you.
				</h1>
				<h2 className="text-xl text-white ">
					Now that we know who you are, I know who I am. I&apos;m not
					a mistake! It all makes sense!
				</h2>
			</div>
		</div>
	</div>
);

export default Home;
