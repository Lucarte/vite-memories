/* eslint-disable react-refresh/only-export-components */
import RegisterForm from "../components/RegisterForm";
import { ActionFunction, Link, redirect } from "react-router-dom";
import DarkModeBtn from "../partials/DarkModeBtn";
import ScrollUpBtn from "../partials/ScrollUpBtn";
import { register } from "../utils/api";
import { useTheme } from "../context/ThemeContext";

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	try {
		await register(formData);
		return redirect("/login");
	} catch (error) {
		return error;
	}
};

const Registration = () => {
	const { enabled } = useTheme();
	return (
		<article className='relative h-full md:mt-16'>
			<DarkModeBtn />
			<ScrollUpBtn />
			<div className='flex flex-col justify-center flex-1 min-h-full px-6 pt-4 lg:px-8'>
				<h2
					className={`mb-4 font-serif text-xl leading-8 text-center text-gray-900, ${
						enabled ? "text-white" : "text-black"
					}`}>
					Become fan of my <br />
					Pearls of Great Price
				</h2>

				{/* Link to actual Form */}
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<RegisterForm />
					<div
						className={`flex justify-center gap-2 mt-10 text-sm text-gray-900, ${
							enabled ? "text-white" : "text-black"
						}`}>
						Already a fan?{" "}
						<p
							className={`font-semibold text-gray-900 hover:text-gray-500, ${
								enabled ? "text-white" : "text-black"
							}`}>
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
