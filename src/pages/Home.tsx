import { Link, useNavigation } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import LightAndUpBtns from "../partials/LightAndUpBtns";
import { useTheme } from "../context/ThemeContext";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
	const navigation = useNavigation();
	const { enabled } = useTheme();
	return (
		<article className='flex flex-col items-center'>
			{navigation.state === "loading" ? <LoadingSpinner /> : null}
			<LightAndUpBtns />

			<img
				className='mb-6 w-60'
				// className='w-72 scale-x-[-1]'
				src={
					enabled
						? "../src/assets/LogoWhiteHome.svg"
						: "../src/assets/MemoriesLogoBlack.svg"
				}
				alt='Home Page Logo for Mobile version'
			/>
			<img />
			<div className=''>
				<div className='text-xl font-bold'>
					<p>My Pearls</p>
					<p>Of Great Price</p>
				</div>

				<div className='flex gap-6'>
					<Link to='/Gabriella'>
						<CustomButton
							type='button'
							text='Gabriella'
							classes={`${
								enabled ? "border-2 border-white" : ""
							} ,'cursor-pointer mt-20 h-10 text-md font-normal rounded-lg rounded-br-none bg-black px-4 leading-6 text-white shadow-md hover:bg-white hover:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'`}
						/>
					</Link>
					<Link to='/Pablo'>
						<CustomButton
							type='button'
							text='Pablo'
							classes={`${
								enabled ? "border-white border-2" : ""
							}, 'cursor-pointer mt-20 h-10 text-md font-normal rounded-lg rounded-br-none bg-white border-4 border-black px-4 leading-6 text-black shadow-md hover:bg-white hover:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'`}
						/>
					</Link>
				</div>
			</div>
		</article>
	);
};

export default Home;
