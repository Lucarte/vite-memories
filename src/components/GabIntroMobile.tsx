import { Link } from "react-router-dom";
import SquareCategoriesGabi from "../components/SquareCategoriesGabi";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

// Define the type for the context
interface OutletContextType {
	showFooter: boolean;
	setShowFooter: (show: boolean) => void;
}

const GabIntroMobile = () => {
	// Access the context values provided by the Outlet
	const { setShowFooter } = useOutletContext<OutletContextType>();

	useEffect(() => {
		// Hide the footer for this component
		setShowFooter(false);
		// Optionally, show the footer again when this component is unmounted
		return () => setShowFooter(false);
	}, [setShowFooter]);

	return (
		<div className='flex flex-col items-center h-screen overflow-hidden text-center'>
			<h1 className='pb-6 text-xl font-bold tracking-wider underline uppercase'>
				.g.a.b.i.
			</h1>
			{/* Does not need absolute path because it exapands on "gabriella/" */}
			<Link to={"memories"} className='absolute mt-16 w-52 h-52'>
				<SquareCategoriesGabi />
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

export default GabIntroMobile;
