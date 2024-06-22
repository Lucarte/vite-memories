import { useContext } from "react";
import { AuthContext, defaultAuth } from "../context/AuthProvider";
import { NavLink, Navigate } from "react-router-dom";

type Props = {
	handleLogout: () => void;
};

const Footer = ({ handleLogout }: Props) => {
	const { auth } = useContext(AuthContext);

	return (
		<footer className='fixed bottom-0 flex items-center justify-center w-full h-20 mx-auto font-light bg-white'>
			{auth.id ? (
				<div className='flex items-center justify-center gap-4'>
					{/* Add the firstName of the person to the message */}
					<p className=''>Welcome into the past!</p>
					<button
						onClick={() => handleLogout()}
						type='button'
						className='px-2 py-1 text-sm text-black border-2 border-gray-100 rounded-md shadow-xl hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'>
						Logout
					</button>
				</div>
			) : (
				<Navigate to='/login' />
			)}
		</footer>
	);
};

export default Footer;
