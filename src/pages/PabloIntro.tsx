import { Link } from "react-router-dom";

const PabloIntro = () => {
	return (
		<div className='flex flex-col items-center h-[84vh] overflow-hidden text-center'>
			<h1 className='pb-6 text-xl font-bold underline uppercase'>
				.p.a.b.l.o.
			</h1>
			<div className='absolute mt-16 w-52 h-52'>
				<div className='top-0 left-0 ml-2 text-xl tracking-widest text-center text-black uppercase dark:text-white'>
					<p className='h-6 underline w-fit'>PROGRAMMING</p>
					<p className='absolute right-0 h-6 mt-[3.4rem] -mr-[4.6rem] rotate-90 underline'>
						PROGRAMMING
					</p>
					<p className='absolute h-6 ml-[1.4rem] rotate-180  mt-[9.9rem] underline'>
						PROGRAMMING
					</p>
					<p className='absolute rotate-[270deg] mt-[4.8rem] -ml-[4.8rem] underline'>
						PROGRAMMING
					</p>
				</div>
				<div className='relative left-[2.1rem] top-[.45rem] tracking-wider text-xl text-center text-black uppercase dark:text-white'>
					<p className='absolute h-6 -mt-2 -ml-1 underline'>B r u n n i s</p>
					<p className='absolute mt-[3.1rem] h-6 ml-[4.6rem] rotate-90 underline'>
						B r u n n i s
					</p>
					<p className='h-6 absolute ml-[1.1rem] rotate-180 mt-[8.1rem] underline'>
						B r u n n i s
					</p>
					<p className='absolute h-6 rotate-[270deg] mt-[4.5rem] -ml-[3.8rem] underline'>
						B r u n n i s
					</p>
				</div>
				<div className='relative text-xl tracking-widest text-center text-black uppercase dark:text-white'>
					<p className='absolute h-6 left-[3.4rem] top-[1.5rem] underline'>
						Music
					</p>
					<p className='absolute h-6 mt-[3.5rem] ml-[7rem] rotate-90 underline'>
						Music
					</p>
					<p className='absolute h-6 ml-[5rem] rotate-180 mt-[7.1rem] underline'>
						Music
					</p>
					<p className='absolute h-6 rotate-[270deg] mt-[5.1rem] ml-[1.4rem] underline'>
						Music
					</p>
				</div>
				<div className='relative text-xl tracking-tight text-center text-black uppercase dark:text-white'>
					<p className='absolute h-6 left-[4.7rem] top-[2.8rem] underline'>
						Art
					</p>
					<p className='absolute h-6 mt-[3.6rem] ml-[6.7rem] rotate-90 underline'>
						Art
					</p>
					<p className='absolute h-6 ml-[5.8rem] rotate-180 mt-[5.7rem] underline'>
						Art
					</p>
					<p className='absolute h-6 rotate-[270deg] mt-[4.9rem] ml-[3.8rem] underline'>
						Art
					</p>
				</div>
			</div>
			<div className='mt-72'>
				<Link
					to='/memory/create'
					className=' mb-6 inline-block h-[1.8rem] px-3 pt-3 text-white bg-black rounded-tl-lg rounded-tr-lg dark:bg-white dark:text-black'>
					<span className='text-white uppercase dark:text-black animate-bounceText'>
						Add Memory
					</span>
				</Link>
				<div className='relative overflow-hidden w-80 h-[28rem]'>
					<div className='absolute inset-0 flex flex-col gap-4'>
						<div className='flex flex-col items-center gap-4 font-sans uppercase rotate-180'>
							<h2 className='text-3xl font-bold underline'>VIOLA</h2>
							<p className='font-normal text-[.6rem] md:text-xs'>
								"For each headache you face, ask youself: <br />
								"Is this mostly real or mostly imagined?" -Solve the real
								<br />
								problems, release the imaginary ones"
								<br /> <span className='font-medium'>James Clear</span>
							</p>
						</div>
						<div className='text-[10px]'>
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
