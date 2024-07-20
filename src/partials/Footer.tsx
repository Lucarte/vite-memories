/* eslint-disable react-refresh/only-export-components */
import {
	ActionFunction,
	Form,
	json,
	redirect,
	useLoaderData,
} from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { logout } from "../utils/api";
import LogoutIcon from "../components/LogoutIcon";

const Footer = () => {
	const { enabled } = useTheme();
	const { loggedIn, user } = useLoaderData() as {
		loggedIn: boolean;
		user: { id: number; first_name: string } | null;
	};
	const userName = loggedIn && user ? `${user.first_name}` : "";

	return (
		<footer
			className={`fixed border-b-8 bottom-0 flex shadow-inner rounded-t-3xl items-center z-10 justify-center w-[calc(100%-16px)] h-20 font-titles ${
				enabled
					? "text-white bg-black bg-opacity-85 border-b-white"
					: "border-b-black text-black bg-white"
			} `}>
			<div className='flex items-center justify-between'>
				<Form
					action='/logout'
					method='POST'
					className='flex items-center gap-4'>
					<p className='text-sm text-gray-400'>
						{loggedIn
							? `Welcome to the past, ${userName}!`
							: "Welcome to the past!"}
					</p>

					<button
						type='submit'
						className={`${
							enabled
								? "text-orange-300 hover:bg-gray-200"
								: "text-orange-300 hover:shadow-xl"
						} px-1 rounded-lg py-2 text-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600`}>
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
