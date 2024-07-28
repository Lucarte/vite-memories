import { Link } from "react-router-dom";

const GabIntro = () => {
	return (
		<div className='flex flex-col items-center h-screen overflow-hidden text-center'>
			<h1 className='pb-6 text-xl font-bold tracking-wider underline uppercase'>
				.g.a.b.i.
			</h1>
			{/* Does not need absolute path because it exapands on "gabriella/" */}
			<Link to={"memories"} className='absolute mt-16 w-52 h-52'>
				<div className='top-0 left-0 text-xl tracking-tight text-center text-black uppercase dark:text-white'>
					<p className='h-6 pt-[.1rem] -ml-[1.8rem] underline cursor-pointer'>
						musical - theater
					</p>
					<p className='absolute right-0 h-6 mt-[3.9rem] -mr-[5rem] rotate-90 underline text-black dark:text-white text-opacity-95 dark:text-opacity-95 cursor-pointer'>
						musical - theater
					</p>
					<p className='absolute h-6 ml-[1.5rem] rotate-180  mt-[10.7rem] underline text-black dark:text-white text-opacity-90 dark:text-opacity-90 cursor-pointer'>
						musical - theater
					</p>
					<p className='absolute rotate-[270deg] mt-[5.2rem] -ml-[5.2rem] underline text-black dark:text-white text-opacity-85  dark:text-opacity-85 cursor-pointer'>
						musical - theater
					</p>
				</div>
				<div className='relative left-[2.1rem] top-[.45rem] tracking-wider text-xl text-center text-black uppercase dark:text-white'>
					<p className='absolute h-6 -mt-1 -ml-2 text-black underline cursor-pointer dark:text-white text-opacity-80 dark:text-opacity-85'>
						b r u n n i s
					</p>
					<p className='absolute mt-[3.4rem] h-6 ml-[4.8rem] rotate-90 underline text-black dark:text-white text-opacity-75 dark:text-opacity-80 cursor-pointer'>
						b r u n n i s
					</p>
					<p className='h-6 absolute ml-[1.2rem] rotate-180 mt-[8.6rem] underline text-black dark:text-white text-opacity-70 dark:text-opacity-75 cursor-pointer'>
						b r u n n i s
					</p>
					<p className='absolute h-6 rotate-[270deg] mt-[5rem] -ml-[4rem] underline text-black dark:text-white text-opacity-65 dark:text-opacity-70 cursor-pointer'>
						b r u n n i s
					</p>
				</div>
				<div className='relative text-xl text-center text-black uppercase dark:text-white'>
					<p className='absolute h-6 left-[3.4rem] top-[1.7rem] underline text-black dark:text-white text-opacity-60 dark:text-opacity-65 cursor-pointer'>
						m u s i c
					</p>
					<p className='absolute h-6 mt-[3.9rem] ml-[6.9rem] rotate-90 underline text-black dark:text-white text-opacity-55 dark:text-opacity-60 cursor-pointer'>
						m u s i c
					</p>
					<p className='absolute h-6 ml-[4.7rem] rotate-180 mt-[7.5rem] underline text-black dark:text-white text-opacity-50 dark:text-opacity-55 cursor-pointer'>
						m u s i c
					</p>
					<p className='absolute h-6 rotate-[270deg] mt-[5.3rem] ml-[1.2rem] underline text-black dark:text-white text-opacity-45 dark:text-opacity-50 cursor-pointer'>
						m u s i c
					</p>
				</div>
				<div className='relative text-xl tracking-tight text-center uppercase'>
					<p className='absolute h-6 left-[4.9rem] top-[3.2rem] underline text-black dark:text-white text-opacity-40 dark:text-opacity-45 cursor-pointer'>
						art
					</p>
					<p className='absolute h-6 mt-[4rem] ml-[6.9rem] rotate-90 underline text-black dark:text-white text-opacity-30 dark:text-opacity-40 cursor-pointer'>
						art
					</p>
					<p className='absolute h-6 ml-[6.1rem] rotate-180 mt-[6.1rem] underline text-black dark:text-white text-opacity-20 dark:text-opacity-30 cursor-pointer'>
						art
					</p>
					<p className='absolute h-6 rotate-[270deg] mt-[5.3rem] ml-[4rem] underline text-black dark:text-white text-opacity-10 dark:text-opacity-20 cursor-pointer'>
						art
					</p>
				</div>
			</Link>
			<div className='mt-72'>
				<Link
					to='/memory/create'
					className='relative overflow-hidden inline-block h-[1.8rem] px-3 pt-3 text-white bg-black rounded-tl-lg rounded-tr-lg dark:bg-white dark:text-black mb-6'>
					<span className='text-white uppercase dark:text-black animate-bounceText'>
						Add Memory
					</span>
				</Link>
				<div className='relative overflow-hidden w-80 h-[28rem]'>
					<div className='absolute inset-0 flex flex-col gap-4'>
						<div className='flex flex-col items-center gap-1 font-sans uppercase rotate-180'>
							<h2 className='text-3xl font-bold underline'>DANCE</h2>
							<p className='font-normal text-[.6rem] md:text-xs'>
								"The information you consume each day <br />
								is the soil from which your <br />
								future thoughts are grown" <br />
								<span className='font-medium'>James Clear</span>
							</p>
						</div>
						<div className='text-[10px] -mt-5'>
							<p>GABRIELLA</p>
							<div className='-space-y-1 rotate-180'>
								<p>G</p>
								<p>A</p>
								<p>B</p>
								<p>R</p>
								<p>I</p>
								<p>E</p>
								<p>L</p>
								<p>L</p>
								<p>A</p>
								<p>L</p>
								<p>L</p>
								<p>E</p>
								<p>I</p>
								<p>R</p>
								<p>B</p>
								<p>A</p>
								<p>G</p>
								<p>G</p>
								<p>A</p>
								<p>B</p>
								<p>R</p>
								<p>I</p>
								<p>E</p>
								<p>L</p>
								<p>L</p>
								<p>A</p>
								<p>L</p>
								<p>L</p>
								<p>E</p>
								<p>I</p>
								<p>R</p>
								<p>B</p>
								<p>A</p>
								<p>G</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GabIntro;
