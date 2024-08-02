/* eslint-disable react-refresh/only-export-components */
import {
	ActionFunction,
	Form,
	json,
	redirect,
	useLoaderData,
} from "react-router-dom";
import { logout } from "../utils/api";
import LogoutIcon from "../components/LogoutIcon";
import { FooterProps } from "../types/FooterProps";

const Footer = ({ enabled, customStyle }: FooterProps) => {
	const { loggedIn, user } = useLoaderData() as {
		loggedIn: boolean;
		user: { id: number; first_name: string } | null;
	};
	const userName = loggedIn && user ? `${user.first_name}` : "";

	return (
		<footer
			className={`${customStyle} fixed bottom-0 flex shadow-inner rounded-t-3xl md:rounded-none items-center z-10 justify-center w-full h-20 font-titles ${
				enabled
					? "text-white bg-black bg-opacity-85 border-b-white"
					: "border-b-black bg-white"
			} `}>
			<div className='flex items-center justify-between'>
				<Form
					action='/logout'
					method='POST'
					className='flex items-center gap-4'>
					<p className='text-sm text-black lg:font-bold lg:text-lg'>
						{loggedIn
							? `Welcome to the past, ${userName}!`
							: "Welcome to the past!"}
					</p>

					<button
						type='submit'
						className='px-1 py-2 text-sm text-orange-500 rounded-lg hover:shadow-xl hover:text-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'>
						<LogoutIcon />
					</button>
				</Form>
			</div>
		</footer>
	);
};

export default Footer;

export const action: ActionFunction = async () => {
	try {
		await logout();
		alert("You have been logged out successfully.");
		return redirect("/login");
	} catch (error) {
		console.log(error);
		return json(
			{
				errorMessage: "Failed to logout. Please try again later.",
			},
			{ status: 400 }
		);
	}
};
