import { Link } from "react-router-dom";
import CustomButton from "../components/CustomButton";

const NotFound = () => {
	return (
		<div className='flex flex-col items-center mt-10 mr-3 md:mt-36'>
			<h1 className='pb-12 ml-3 text-7xl'>404</h1>
			<div className='flex flex-col items-center gap-10'>
				<p className='ml-12 text-3xl'>
					SOM <span>ETHING</span>
				</p>
				<p className='text-3xl ml-28'>
					UN <span>EXPECTED</span>
				</p>
				<p className='ml-2 text-3xl'>
					HAPP <span>ENED</span>
				</p>

				<div className='flex '>
					<button className='px-4 font-normal text-white bg-black rounded-tl-none rounded-br-none shadow-md cursor-pointer h-7 rounded-2xl text-md hover:bg-white hover:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'>
						Return
					</button>
					<Link to='/'>
						<CustomButton
							type='button'
							text='Home'
							classes='font-bold underline cursor-pointer h-10 text-md font-normal rounded-2xl rounded-br-none rounded-tl-none bg-white border-4 border-black px-4 leading-6 text-black shadow-md hover:bg-white hover:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
