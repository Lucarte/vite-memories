import { Link } from "react-router-dom";
import SquareCategoriesPablo from "../components/SquareCategoriesPablo";

const PabloIntro = () => {
	return (
		<div className='flex flex-col items-center max-h-screen overflow-hidden text-center'>
			{/* <div className='flex flex-col items-center h-[84vh] overflow-hidden text-center'> */}
			<h1 className='pb-6 text-xl font-bold tracking-wider underline uppercase'>
				.p.a.b.l.o.
			</h1>
			<Link to={"memories"} className='absolute mt-16 w-52 h-52'>
				<SquareCategoriesPablo />
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
