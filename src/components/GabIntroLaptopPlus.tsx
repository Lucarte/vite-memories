import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import SquareCategoriesGabi from "./SquareCategoriesGabi";
import Tree from "../media/tree.png";
import DarkModeBtn from "../partials/DarkModeBtn";

interface OutletContextType {
	showFooter: boolean;
	setShowFooter: (show: boolean) => void;
}

const GabIntroLaptopPlus = () => {
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

		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		setShowFooter(false);
		return () => setShowFooter(false);
	}, [setShowFooter]);

	return (
		<div className='fixed top-[15%] left-[7%] right-[7%] bottom-[10%] border-8 border-black dark:border-white'>
			<DarkModeBtn classes='bottom-20' />
			<main className='flex flex-col w-full h-full gap-2'>
				<div className='grid h-full grid-cols-3'>
					{/* Element LEFT */}
					<div className='flex items-center justify-center h-[calc(100vh*2/3)]'>
						<div className='h-full overflow-hidden rotate-90 w-80'>
							<div className='inset-0 flex flex-col gap-4 transform translate-y-[55%]'>
								<div className='flex flex-col items-center gap-1 font-sans uppercase rotate-180'>
									<h2 className='text-3xl font-bold underline'>DANCE</h2>
									<p className='font-normal text-[.6rem] text-center'>
										"The information you consume each day is the soil from
										<br /> which your future thoughts are grown" <br />
										<span className='font-medium'>James Clear</span>
									</p>
								</div>
								<div className='text-[10px] text-center -mt-5'>
									<p>GABRIELLA</p>
									<div className='-space-y-1'>
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
					{/* Middle Element -- TREE/S */}
					<div className='flex justify-center relative mt-[10vh]'>
						<div className='relative'>
							<Link
								to={"memories"}
								className={`absolute bottom-60 -translate-x-1/2 rotate-45 w-52 h-52 transition-opacity duration-1000 left-1/2 ${
									isFading ? "opacity-0" : "opacity-100"
								}`}>
								{!showImage ? <SquareCategoriesGabi /> : null}
							</Link>
							{/* Tree Image */}
							<span
								className={`fixed left-[53%] -translate-x-[53%] bottom-24 transition-opacity duration-1000 ${
									isFading ? "opacity-0" : "opacity-100"
								}`}>
								{showImage ? (
									<img src={Tree} alt='Tree' className='h-auto w-52' />
								) : null}
							</span>
							{/* Tronco */}
							<span
								className={`absolute w-2 bottom-24 text-center transform -translate-x-1/2 bg-black dark:bg-white bg-opacity-70 h-28 left-1/2 transition-opacity duration-1000 ${
									isFading || showImage ? "opacity-0" : "opacity-100"
								}`}></span>
							{/* Matera */}
							<span
								className={`absolute w-56 text-center transform -translate-x-1/2 transition-opacity duration-1000 ${
									isFading
										? "opacity-0"
										: showImage
										? "opacity-60"
										: "opacity-100"
								} bg-black rounded-t-none h-28 dark:bg-white rounded-3xl bg-opacity-70 left-1/2 -bottom-1`}></span>

							{/* Title */}
							<span
								className={`absolute w-64 text-[1.6rem] text-center font-semibold text-white uppercase transform -translate-x-1/2 dark:text-black transition-opacity duration-1000 left-1/2 bottom-8 ${
									isFading ? "opacity-0" : "opacity-100"
								}`}>
								{displayText}
							</span>
						</div>
					</div>
					{/* Element RIGHT */}
					<div className='flex items-center justify-center h-[calc(100vh*2/3)]'>
						<div className='overflow-hidden rotate-[270deg] w-80 h-full'>
							<div className='inset-0 flex flex-col gap-4 transform translate-y-[55%]'>
								<div className='flex flex-col items-center gap-1 font-sans uppercase rotate-180'>
									<h2 className='text-3xl font-bold underline'>DANCE</h2>
									<p className='font-normal text-[.6rem] text-center'>
										"The information you consume each day is the soil from
										<br /> which your future thoughts are grown" <br />
										<span className='font-medium'>James Clear</span>
									</p>
								</div>
								<div className='text-[10px] text-center -mt-5'>
									<p>GABRIELLA</p>
									<div className='-space-y-1'>
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
			</main>
		</div>
	);
};

export default GabIntroLaptopPlus;
