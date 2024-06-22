import { Link, useNavigation } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import LightAndUpBtns from "../partials/LightAndUpBtns";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
	const navigation = useNavigation();
	const { enabled } = useTheme();
	return (
		<article className='flex flex-col items-center'>
			{navigation.state === "loading" ? (
				<p>loading, have patience!!</p>
			) : // or <LoadingSpinner /> statt p-tag
			null}
			<LightAndUpBtns />

			<img
				className='w-72'
				// className='w-72 scale-x-[-1]'
				src={
					enabled
						? "../src/assets/MemoriesLogoWhite.svg"
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

				<div className='flex gap-2'>
					<Link to='/Gabriella'>
						<CustomButton
							type='button'
							text='Gabriella'
							classes='cursor-pointer mt-20 h-10 text-md font-normal rounded-lg rounded-br-none bg-black px-4 leading-6 text-white shadow-md hover:bg-white hover:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'
						/>
					</Link>
					<Link to='/Pablo'>
						<CustomButton
							type='button'
							text='Pablo'
							classes='cursor-pointer mt-20 h-10 text-md font-normal rounded-lg rounded-br-none bg-white border-4 border-black px-4 leading-6 text-black shadow-md hover:bg-white hover:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'
						/>
					</Link>
				</div>
			</div>
		</article>
	);
};

export default Home;
