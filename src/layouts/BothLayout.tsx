import MenuBarsIcon from "../components/MenuBarsIcon";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Link, Outlet } from "react-router-dom";
import { loggedInData } from "../utils/api";
import classNames from "classnames";
import { navigation } from "../utils/navigation";
import DarkModeBtn from "../partials/DarkModeBtn";

const BothLayout: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);
	const { enabled } = useTheme();
	const [userId, setUserId] = useState<number | null>(null); // Explicitly define userId type

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const { loggedIn, user } = await loggedInData();
				setLoggedIn(loggedIn);
				if (loggedIn && user) {
					setUserId(user.id); // Set userId only if user is not null
				}
			} catch (error) {
				console.error("Failed to fetch user data:", error);
			}
		};

		fetchUserData();
	}, [loggedIn]); // Dependency on loggedIn state to re-fetch user data when login status changes

	const handleClick = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	return (
		<>
			<header className='flex items-center justify-between p-8'>
				<DarkModeBtn />
				{/* Logo in mobile && Logo and Name description other sizes */}
				<div className='flex items-center justify-start md:min-w-48'>
					<Link to='/' className='-mt-[4px]'>
						{enabled ? (
							<h1 className='font-black'>B.R.U.N.N.I.S</h1>
						) : (
							<h1 className='font-bold underline'>B.R.U.N.N.I.S</h1>
						)}
					</Link>
					<p className='hidden md:block md:ml-10'>B.R.U.N.N.I.S</p>
				</div>
				{/* Search icon in mobile && h1-tag in other sizes */}
				<div className='flex justify-center pr-4'>
					<div className='block md:hidden'>
						{/* <MagnifyingGlassIcon className='w-5 h-5 mr-7' /> */}
					</div>
					<div className='hidden md:block'>
						<p>B.R.U.N.N.I.S</p>
					</div>
				</div>
				{/* Menu in mobile && Menu and Search icon in other sizes */}
				<div className='flex items-center justify-end md:min-w-48'>
					{/* <MagnifyingGlassIcon className='hidden w-5 h-5 md:block md:mr-10' /> */}
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
							to={
								item.href === "/fan/{id}"
									? userId
										? `/fan/${userId}`
										: "/login"
									: item.href
							}
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

export default BothLayout;
