import { Link, Outlet } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import MenuBarsIcon from "../components/MenuBarsIcon";
import Nav from "../partials/Nav";
import { navigation } from "../utils/navigation";
import classNames from "classnames";

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
				<div className='flex items-center justify-start md:min-w-48'></div>
				<div className='flex justify-center'>
					<div className='hidden md:block'>
						{/* Make name dynamic */}
						<p>G.A.B.I.</p>
					</div>
				</div>
				<div className='flex items-center justify-end md:min-w-48'>
					<button
						type='button'
						onClick={handleClick}
						className={`${
							enabled ? "text-black" : "text-white"
						} absolute top-0 right-0 w-16 h-16 font-bold text-2xl pt-10 pr-10 rounded-sm cursor-pointer`}
						aria-hidden='true'>
						{isMenuOpen ? <span>X</span> : <MenuBarsIcon />}
					</button>
				</div>
			</header>
			<main>
				<Outlet />
			</main>
			{isMenuOpen && (
				<nav
					className={`${
						enabled ? "bg-white text-black" : "bg-black text-white"
					} absolute top-0 right-0 z-50 flex flex-col justify-center w-full h-full px-12 overflow-auto shadow-md lg:w-1/2`}>
					<button
						type='button'
						onClick={handleClick}
						className={`${
							enabled ? "text-black" : "text-white"
						} absolute top-0 right-0 w-16 h-16 font-bold text-2xl pt-10 pr-10 rounded-sm cursor-pointer`}
						aria-hidden='true'>
						X
					</button>

					{navigation.map((item) => (
						<Link
							key={item.name}
							to={item.href}
							aria-current={item.current ? "page" : undefined}
							onClick={handleClick}
							className={classNames(
								item.current
									? enabled
										? "bg-black text-white"
										: "bg-white text-black"
									: enabled
									? "hover:text-white hover:bg-black hover:text-right"
									: "hover:text-black hover:bg-white hover:text-right",
								"block font-titles rounded-md py-2 px-3 text-2xl uppercase font-medium"
							)}>
							{item.name}
						</Link>
					))}
				</nav>
			)}
		</>
	);
};

export default HomeLayout;
