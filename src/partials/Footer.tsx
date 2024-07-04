import { ActionFunction, Form, redirect } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { logout } from "../utils/api";

const Footer = () => {
	const { enabled } = useTheme();

	return (
		<footer
			className={`fixed bottom-0 flex items-center z-10 font-serif italic rounded-tl-full justify-end pr-4 w-[calc(100%-16px)] h-12 -mr-2 font-light ${
				enabled ? "bg-white text-black" : "bg-black text-white"
			} `}>
			<div className='flex items-center justify-between'>
				{/* Add the firstName of the person to the message */}
				<Form
					action='/logout'
					method='POST'
					className='flex items-center gap-6'>
					<p className=''>Welcome into the past!</p>

					<button
						type='submit'
						className={`${
							enabled
								? "text-black border-gray-100 hover:bg-gray-500"
								: "text-black bg-gray-200 border-gray-800 hover:bg-gray-300"
						} px-2 py-1 text-sm border-2 rounded-md shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600`}>
						Logout
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
		return redirect("/login");
	} catch (error) {
		console.log(error);
	}
};
