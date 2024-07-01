import { ActionFunction, Form, redirect } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { logout } from "../utils/api";

const Footer = () => {
	const { enabled } = useTheme();

	return (
		<footer
			className={`fixed bottom-0 flex items-center z-10 bg-black text-white rounded-tl-full justify-end pr-4 w-[calc(100%-16px)] h-16 -mr-2 font-light ${
				enabled ? "bg-white text-black" : "bg-black text-white"
			} `}>
			<div className='flex items-center justify-center gap-4'>
				{/* Add the firstName of the person to the message */}
				<Form
					action='/logout'
					method='POST'
					className='flex items-center gap-2'>
					<p className=''>Welcome into the past!</p>
					<button
						type='submit'
						className={`${
							enabled
								? "text-black border-gray-100 hover:bg-gray-500"
								: "text-white border-gray-800 hover:bg-gray-900"
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
