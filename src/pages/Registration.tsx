import RegisterForm from "../components/RegisterForm";
import LightUpBtns from "../partials/LightAndUpBtns";
import { Link } from "react-router-dom";

const Registration = () => {
	return (
		<article className='relative h-full md:mt-16'>
			<LightUpBtns />
			<div className='flex flex-col justify-center flex-1 min-h-full px-6 pt-4 lg:px-8'>
				<h2 className='mb-4 font-serif text-xl leading-8 text-center text-gray-900'>
					Become fan of my <br />
					Pearls of Great Price
				</h2>

				{/* Link to actual Form */}
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<RegisterForm />
					<div className='flex justify-center gap-2 mt-10 text-sm text-gray-900'>
						Already a fan?{" "}
						<p className='font-semibold text-gray-900 hover:text-gray-500'>
							<Link to='/login'>
								Login <span className='underline'>here!</span>
							</Link>
						</p>
					</div>
				</div>
			</div>
		</article>
	);
};

export default Registration;
