import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import SquareCategoriesGabi from "./SquareCategoriesGabi";
import Tree from "../media/tree.png";
// Define the type for the context
interface OutletContextType {
	showFooter: boolean;
	setShowFooter: (show: boolean) => void;
}

const GabIntroLaptopPlus = () => {
	// Access the context values provided by the Outlet
	const { setShowFooter } = useOutletContext<OutletContextType>();
	const [displayText, setDisplayText] = useState("ADD MEMORY");
	const [isFading, setIsFading] = useState(false);
	const [showImage, setShowImage] = useState(false);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setIsFading(true);
			setTimeout(() => {
				setDisplayText((prevText) =>
					prevText === "ADD MEMORY" ? "AND WATER" : "ADD MEMORY"
				);
				setShowImage((prev) => !prev);
				setIsFading(false);
			}, 1000);
		}, 3000);

		return () => clearInterval(intervalId); // Cleanup the interval on component unmount
	}, []);

	useEffect(() => {
		// Hide the footer for this component
		setShowFooter(false);
		// Optionally, show the footer again when this component is unmounted
		return () => setShowFooter(false);
	}, [setShowFooter]);

	return (
		<>
			<main className='flex flex-col gap-2 h-[calc(100vh-12rem)] mx-20 border-8 border-black dark:border-white '>
				<div className='grid h-screen grid-cols-3'>
					<div className='flex items-center justify-center bg-red-900'>1a</div>
					<div className='flex justify-center mt-[10vh]'>
						<div className='relative'>
							<Link to={"memories"} className='block mt-16 rotate-45 w-52 h-52'>
								{!showImage ? <SquareCategoriesGabi /> : null}
							</Link>
							<span
								className={`absolute mt-16 w-52 h-52 transition-opacity duration-500 ${
									isFading ? "opacity-0" : "opacity-100"
								}`}>
								{showImage ? (
									<img
										src={Tree}
										alt='My Image'
										className='object-cover w-full h-full'
									/>
								) : null}
							</span>
							<span className='absolute w-2 mt-10 text-center transform -translate-x-1/2 bg-black dark:bg-white bg-opacity-70 h-28 left-1/2'></span>
							<span className='absolute w-64 h-32 text-center transform -translate-x-1/2 bg-black rounded-t-none dark:bg-white rounded-3xl mt-36 bg-opacity-70 left-1/2'></span>
							<span
								className={`absolute w-64 text-[2rem] text-center text-white uppercase transform -translate-x-1/2 dark:text-black mt-48 left-1/2 transition-opacity duration-1000 ${
									isFading ? "opacity-0" : "opacity-100"
								}`}>
								{displayText}
							</span>
						</div>
					</div>
					<div className='flex items-center justify-center bg-red-900'>3a</div>
				</div>
			</main>
		</>
	);
};

export default GabIntroLaptopPlus;
