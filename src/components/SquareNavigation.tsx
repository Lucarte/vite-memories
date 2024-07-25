import { Link } from "react-router-dom";

const SquareNavigation = () => {
	return (
		<div className='flex flex-col items-center h-screen gap-6 overflow-hidden text-center'>
			<h1 className='pb-6 text-xl font-bold underline uppercase'>
				.p.a.b.l.o.
			</h1>
			<div className='w-64 h-64 bg-gray-100'>
				<p className='absolute top-0 left-0 h-6 border-b w-fit border:white'>
					Music Theater
				</p>
				<p className='absolute right-0 h-6 mt-[4.4rem] -mr-4 rotate-90 border-b w-fit border:white'>
					Music Theater
				</p>
				<p className='absolute h-6 ml-[1.2rem] rotate-180 border-b mt-[10rem] w-fit border:white'>
					Music Theater
				</p>
				<p className='absolute w-fit h-6 rotate-[270deg] mt-[5.6rem] -ml-[4.4rem] border-b border:white'>
					Music Theater
				</p>
			</div>
			<div className='relative w-48 text-xl text-center text-white uppercase bg-orange-500'>
				<p className='absolute h-6 border-b left-[.6rem] top-4 w-fit border:white'>
					B r u n n i
				</p>
				<p className='absolute h-6 mt-[3.6rem] ml-[4.6rem] rotate-90 border-b w-fit border:white'>
					B r u n n i
				</p>
				<p className='absolute h-6 ml-[1.9rem] rotate-180 border-b mt-[7.7rem] w-fit border:white'>
					B r u n n i
				</p>
				<p className='absolute w-fit h-6 rotate-[270deg] mt-[5rem] -ml-[2.1rem] border-b border:white'>
					B r u n n i
				</p>
			</div>
			<div className='relative w-48 text-xl text-center text-white uppercase bg-orange-500'>
				<p className='absolute h-6 border-b left-[.6rem] top-4 w-fit border:white'>
					Music
				</p>
				<p className='absolute h-6 mt-[3.6rem] ml-[4.6rem] rotate-90 border-b w-fit border:white'>
					Music
				</p>
				<p className='absolute h-6 ml-[1.9rem] rotate-180 border-b mt-[7.7rem] w-fit border:white'>
					Music
				</p>
				<p className='absolute w-fit h-6 rotate-[270deg] mt-[5rem] -ml-[2.1rem] border-b border:white'>
					Music
				</p>
			</div>
			<Link
				to='/memory/create'
				className='relative inline-block h-[1.8rem] px-3 pt-3 text-white bg-black rounded-tl-lg rounded-tr-lg dark:bg-white dark:text-black'>
				<span className='text-white uppercase dark:text-black animate-bounceText'>
					Add Memory
				</span>
			</Link>
			<div className='relative overflow-hidden w-80 h-96'>
				<div className='absolute inset-0 flex flex-col gap-4'>
					<div className='flex flex-col items-center gap-4 font-sans uppercase rotate-180'>
						<h2 className='text-3xl font-bold underline'>VIOLA</h2>
						<p className='font-serif text-xs'>
							"Solve the real problems, <br /> release the imaginary ones"
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
						</div>
					</div>
				</div>
			</div>
		</div>
		// <>
		// 	<div className='relative w-56 text-xl text-center text-white uppercase bg-orange-500'>

		// 	</div>
		// </>
	);
};

export default SquareNavigation;
