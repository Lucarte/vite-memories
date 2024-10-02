import { Link, useNavigation } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import { useTheme } from "../context/ThemeContext";
import HourGlassSpinner from "../components/HourGlassSpinner";
import homeBlack from "../assets/HomeBlack.svg";
import homeWhite from "../assets/HomeWhite.svg";

const Home = () => {
	const navigation = useNavigation();
	const { enabled } = useTheme();

	return (
		<article className='flex flex-col items-center pt-[8vh] lg:pt-[15vh] 2xl:pt-[20vh]'>
			<div className='hidden lg:mt-8 lg:flex lg:justify-center'>
				<h1 className='pb-20 -mt-20 font-serif text-3xl font-semibold uppercase 2xl:pb-20'>
					my pearls of great price
				</h1>
			</div>
			<div className='relative'>
				<img
					className='mb-6 w-60 lg:w-72 lg:-mb-2'
					src={enabled ? homeWhite : homeBlack}
					alt='Home Page Logo for Mobile version'
				/>

				<div className='absolute inset-0 flex items-center justify-center'>
					{navigation.state === "loading" ? <HourGlassSpinner /> : null}
				</div>
			</div>
			<div className=''>
				<div className='text-xl font-bold lg:hidden'>
					<p>My Pearls</p>
					<p>Of Great Price</p>
				</div>
				<div className='flex gap-6 lg:gap-8 lg:ml-4'>
					<Link to='/gabriella'>
						<CustomButton
							type='button'
							text='Gabriella'
							classes={`${
								enabled
									? "bg-white border-white hover:border-white text-black hover:bg-black hover:text-white"
									: "bg-black text-white border-black hover:shadow-md hover:bg-white hover:border-white hover:text-black"
							} cursor-pointer lg:h-12 lg:px-4 lg:text-2xl border-4 mt-20 h-10 text-md font-normal rounded-lg rounded-br-none px-4 leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
						/>
					</Link>
					<Link to='/pablo'>
						<CustomButton
							type='button'
							text='Pablo'
							classes={`${
								enabled
									? "hover:bg-white hover:text-black hover:border-white bg-black text-white"
									: "border-black hover:bg-black hover:text-white"
							} cursor-pointer lg:h-12 lg:px-4 lg:text-2xl mt-20 h-10 lg:text-2xl text-md font-normal rounded-lg border-4 rounded-br-none border-4 px-4 leading-6 shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
						/>
					</Link>
				</div>
			</div>
		</article>
	);
};

export default Home;
