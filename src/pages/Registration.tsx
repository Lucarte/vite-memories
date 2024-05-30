import RegisterForm from "../components/RegisterForm";
import LightUpBtns from "../components/LightUpBtns";

const Registration = () => {
	return (
		<div className='h-full relative'>
			<LightUpBtns />
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
				<h2 className='mb-4 text-center font-serif text-xl leading-8 text-gray-900'>
					Become fan of my <br />
					Pearls of Great Price
				</h2>

				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
					<RegisterForm />

					{/* link to login */}
					<p className='mt-10 text-center text-sm text-gray-900'>
						Already a fan?{" "}
						<a
							href='#'
							className='font-semibold leading-6 text-gray-900 hover:text-gray-500'>
							Login <span className='underline'>here!</span>
						</a>
					</p>
					{/* link to registration !!! MUST GO IN THE LOGIN, NOT HERE :)) */}
					{/* <p className='mt-10 text-center text-sm text-gray-900'>
						Not a fan yet?{" "}
						<a
							href='#'
							className='font-semibold leading-6 text-gray-900 hover:text-gray-500'>
							Register <span className='underline'>here!</span>
						</a>
					</p> */}
				</div>
			</div>
		</div>
	);
};

export default Registration;
