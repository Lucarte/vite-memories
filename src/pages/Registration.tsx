/* eslint-disable react-refresh/only-export-components */
import { ActionFunction, Link, json, useActionData } from "react-router-dom";
import ScrollUpBtn from "../partials/ScrollUpBtn";
import RegisterForm from "../components/RegisterForm";
import { register } from "../utils/api";
import { useTheme } from "../context/ThemeContext";

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();

	try {
		await register(formData);
		return json(
			{
				successMessage: "SUCCESS!!!",
				redirectTo: "/memories",
			},
			{ status: 200 }
		);
	} catch (error) {
		return json(
			{
				errorMessage: "REGISTRATION FAILED",
			},
			{ status: 400 }
		);
	}
};

const Registration = () => {
	const { enabled } = useTheme();
	const actionData = useActionData() as {
		successMessage?: string;
		errorMessage?: string;
		redirectTo?: string;
	};

	return (
		<article className='relative h-full md:mt-16'>
			<ScrollUpBtn />
			<div className='flex flex-col justify-center flex-1 min-h-full px-6 pt-4 lg:px-8'>
				<h2
					className={`mb-4 font-serif text-xl leading-8 text-center ${
						enabled ? "text-white" : "text-black"
					}`}>
					Become a fan of my <br />
					Pearls of Great Price
				</h2>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<RegisterForm actionData={actionData} />
					<div
						className={`flex justify-center gap-2 mt-10 mb-20 text-sm ${
							enabled ? "text-white" : "text-black"
						}`}>
						Already a fan?{" "}
						<p
							className={`font-semibold hover:text-gray-500 ${
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
