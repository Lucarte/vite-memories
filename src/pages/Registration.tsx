import RegisterForm from "../components/RegisterForm";
import LightUpBtns from "../components/LightAndUpBtns";

const Registration = () => {
	return (
		<div className='relative h-full mt-3 md:mt-16'>
			<LightUpBtns />
			<div className='flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8'>
				<h2 className='mb-4 font-serif text-xl leading-8 text-center text-gray-900'>
					Become fan of my <br />
					Pearls of Great Price
				</h2>

				{/* Link to actual Form */}
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<RegisterForm />
					<p className='mt-10 text-sm text-center text-gray-900'>
						Already a fan?{" "}
						<a
							href='#'
							className='font-semibold leading-6 text-gray-900 hover:text-gray-500'>
							Login <span className='underline'>here!</span>
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Registration;
