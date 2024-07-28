import { Link } from "react-router-dom";

const PabloIntro = () => {
	return (
		<div className='flex flex-col items-center max-h-screen overflow-hidden text-center'>
			{/* <div className='flex flex-col items-center h-[84vh] overflow-hidden text-center'> */}
			<h1 className='pb-6 text-xl font-bold tracking-wider underline uppercase'>
				.p.a.b.l.o.
			</h1>
			<Link to={"/pablo/memories"} className='absolute mt-16 w-52 h-52'>
				<div className='top-0 left-0 text-xl tracking-[.2rem] text-center text-black uppercase dark:text-white'>
					<p className='h-6 underline w-fit'>PROGRAMMING</p>
					<p className='absolute right-0 h-6 mt-[3.9rem] -mr-[5.1rem] rotate-90 underline text-black dark:text-white text-opacity-95 dark:text-opacity-95'>
						PROGRAMMING
					</p>
					<p className='absolute h-6 ml-[1.5rem] rotate-180  mt-[10.7rem] underline text-black dark:text-white text-opacity-90 dark:text-opacity-90'>
						PROGRAMMING
					</p>
					<p className='absolute rotate-[270deg] mt-[5.2rem] -ml-[5.2rem] underline text-black dark:text-white text-opacity-85  dark:text-opacity-85'>
						PROGRAMMING
					</p>
				</div>
				<div className='relative left-[2.1rem] top-[.45rem] tracking-wider text-xl text-center text-black uppercase dark:text-white'>
					<p className='absolute h-6 -mt-1 -ml-2 text-black underline dark:text-white text-opacity-80 dark:text-opacity-85'>
						B r u n n i s
					</p>
					<p className='absolute mt-[3.4rem] h-6 ml-[4.8rem] rotate-90 underline text-black dark:text-white text-opacity-75 dark:text-opacity-80'>
						B r u n n i s
					</p>
					<p className='h-6 absolute ml-[1.2rem] rotate-180 mt-[8.6rem] underline text-black dark:text-white text-opacity-70 dark:text-opacity-75'>
						B r u n n i s
					</p>
					<p className='absolute h-6 rotate-[270deg] mt-[5rem] -ml-[4rem] underline text-black dark:text-white text-opacity-65 dark:text-opacity-70'>
						B r u n n i s
					</p>
				</div>
				<div className='relative text-xl text-center text-black uppercase dark:text-white'>
					<p className='absolute h-6 left-[3.4rem] top-[1.7rem] underline text-black dark:text-white text-opacity-60 dark:text-opacity-65'>
						M u s i c
					</p>
					<p className='absolute h-6 mt-[3.9rem] ml-[6.9rem] rotate-90 underline text-black dark:text-white text-opacity-55 dark:text-opacity-60'>
						M u s i c
					</p>
					<p className='absolute h-6 ml-[4.7rem] rotate-180 mt-[7.5rem] underline text-black dark:text-white text-opacity-50 dark:text-opacity-55'>
						M u s i c
					</p>
					<p className='absolute h-6 rotate-[270deg] mt-[5.3rem] ml-[1.2rem] underline text-black dark:text-white text-opacity-45 dark:text-opacity-50'>
						M u s i c
					</p>
				</div>
				<div className='relative text-xl tracking-tight text-center uppercase'>
					<p className='absolute h-6 left-[4.9rem] top-[3.2rem] underline text-black dark:text-white text-opacity-40 dark:text-opacity-45'>
						Art
					</p>
					<p className='absolute h-6 mt-[4rem] ml-[6.9rem] rotate-90 underline text-black dark:text-white text-opacity-30 dark:text-opacity-40'>
						Art
					</p>
					<p className='absolute h-6 ml-[6.1rem] rotate-180 mt-[6.1rem] underline text-black dark:text-white text-opacity-20 dark:text-opacity-30'>
						Art
					</p>
					<p className='absolute h-6 rotate-[270deg] mt-[5.3rem] ml-[4rem] underline text-black dark:text-white text-opacity-10 dark:text-opacity-20'>
						Art
					</p>
				</div>
			</Link>
			<div className='mt-72'>
				<Link
					to='/memory/create'
					className='mb-6 inline-block h-[1.8rem] px-3 pt-3 text-white bg-black rounded-tl-lg rounded-tr-lg dark:bg-white dark:text-black'>
					<span className='text-white uppercase dark:text-black animate-bounceText'>
						Add Memory
					</span>
				</Link>
				<div className='relative overflow-hidden w-80 h-[28rem]'>
					<div className='absolute inset-0 flex flex-col'>
						<div className='flex flex-col items-center gap-1 font-sans uppercase rotate-180'>
							<h2 className='text-3xl font-bold underline'>VIOLA</h2>
							<p className='font-normal text-[.6rem] md:text-xs'>
								"For each headache you face, ask youself: <br />
								"Is this mostly real or mostly imagined?" -Solve the real
								<br />
								problems, release the imaginary ones"
								<br /> <span className='font-medium'>James Clear</span>
							</p>
						</div>
						<div className='text-[10px] -mt-1'>
							<p>PABLO</p>
							<div className='-space-y-1 rotate-180'>
								<p>P</p>
								<p>A</p>
								<p>B</p>
								<p>L</p>
								<p>O</p>
								<p>L</p>
								<p>B</p>
								<p>A</p>
								<p>P</p>
								<p>A</p>
								<p>B</p>
								<p>L</p>
								<p>O</p>
								<p>L</p>
								<p>B</p>
								<p>A</p>
								<p>P</p>
								<p>A</p>
								<p>B</p>
								<p>L</p>
								<p>O</p>
								<p>L</p>
								<p>B</p>
								<p>A</p>
								<p>P</p>
								<p>A</p>
								<p>B</p>
								<p>L</p>
								<p>O</p>
								<p>L</p>
								<p>B</p>
								<p>A</p>
								<p>P</p>
								<p>A</p>
								<p>B</p>
								<p>L</p>
								<p>O</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PabloIntro;
