import { Outlet } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import MenuBarsIcon from "../components/MenuBarsIcon";
import Nav from "../partials/Nav";

const HomeLayout = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { enabled } = useTheme();

	const handleClick = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useEffect(() => {
		if (isMenuOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
	}, [isMenuOpen]);

	return (
		<>
			<header className='flex items-center justify-between p-8'>
				<div className='flex items-center justify-start md:min-w-48'>
					{/* Optionally add other elements here or keep it empty */}
				</div>
				<div className='flex justify-center'>
					<div className='hidden md:block'>
						{/* Optional content */}
						<p>G.A.B.I.</p>
					</div>
				</div>
				<div className='flex items-center justify-end md:min-w-48'>
					<button type='button' onClick={handleClick} className='z-50'>
						{isMenuOpen ? (
							<XMarkIcon
								className='block text-black rounded-sm w-7 h-7 hover:bg-black hover:text-white'
								aria-hidden='true'
							/>
						) : (
							<MenuBarsIcon />
						)}
					</button>
				</div>
			</header>
			{isMenuOpen && <Nav onClick={() => setIsMenuOpen(false)} />}
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default HomeLayout;
