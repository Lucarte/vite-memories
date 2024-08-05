import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Link, Outlet, useLocation } from "react-router-dom";
import classNames from "classnames";
import { loggedInData } from "../utils/api";
import { navigation } from "../utils/navigation";
import ScrollUpBtn from "../partials/ScrollUpBtn";
import LoadingLayout from "./LoadingLayout";
import logoWhiteThick from "../assets/LogoBlack.svg";
import logoBlack from "../assets/LogoWhite.svg";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Search from "../components/Search";
import FooterWithTheme from "../HOC/FooterWithTheme";
import MenuBarsIcon from "../components/MenuBarsIcon";
import DarkModeBtn from "../partials/DarkModeBtn";

export const loader = async () => {
	const { loggedIn, user } = await loggedInData();
	return { loggedIn, isAdmin: user?.isAdmin ?? false, user };
};

const BothLayout = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { enabled } = useTheme();
	const [isSearchVisible, setIsSearchVisible] = useState(false);
	const [isMdViewport, setIsMdViewport] = useState(window.innerWidth > 768);
	const [userId, setUserId] = useState<number | null>(null);
	const handleResize = () => {
		setIsMdViewport(window.innerWidth > 768);
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleClick = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleSearchClick = () => {
		setIsSearchVisible(!isSearchVisible);
	};

	const location = useLocation();

	const getTitle = () => {
		if (location.pathname.includes("/pablo/memories")) {
			return ".P.A.B.L.O'.S..M.E.M.O.R.I.E.S.";
		} else if (location.pathname.includes("/gabriella/memories")) {
			return ".G.A.B.I'.S..M.E.M.O.R.I.E.S.";
		} else if (location.pathname.includes("/brunnis/memories")) {
			return ".B.R.U.N.N.I'.S..M.E.M.O.R.I.E.S.";
		} else if (location.pathname.includes("/memories")) {
			return ".A.L.L..M.E.M.O.R.I.E.S.";
		}
		return "POSTS"; // Default title
	};

	const logoSrc = enabled
		? isMdViewport
			? logoBlack
			: logoWhiteThick
		: logoBlack;

	const logoAlt = enabled && !isMdViewport ? "Logo White Thick" : "Logo Black";

	const barColor = enabled
		? isMdViewport
			? "bg-black"
			: "bg-white"
		: !isMdViewport
		? "bg-black"
		: "bg-black";

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const { loggedIn, user } = await loggedInData();
				setLoggedIn(loggedIn);
				if (loggedIn && user) {
					setUserId(user.id);
				} else {
					setUserId(null);
				}
			} catch (error) {
				console.error("Failed to fetch user data:", error);
			}
		};

		fetchUserData();
	}, []);

	return (
		<div className='border-8 border-black dark:border-white dark:md:bg-white md:border-none'>
			<LoadingLayout>
				<>
					{isSearchVisible && (
						<div
							className={`${
								enabled ? "bg-white" : "bg-black"
							} fixed top-0 left-0 right-0 z-40 flex flex-col items-center h-full pb-12`}>
							<Search onResultClick={handleSearchClick} />
							<button
								type='button'
								onClick={handleSearchClick}
								className={`${
									enabled
										? "text-black hover:text-gray-100"
										: "text-white hover:text-gray-700"
								} font-black absolute text-2xl top-5 right-8`}>
								X
							</button>
						</div>
					)}

					<header className='flex items-center justify-between p-8 dark:md:text-black'>
						<div className='flex items-center justify-start md:min-w-48'>
							<Link to='/' className='-mt-[4px]'>
								<img src={logoSrc} className='w-11' alt={logoAlt} />
							</Link>
						</div>
						<div className='flex justify-center pr-4'>
							<div className='block md:hidden pr-7'>
								<MagnifyingGlassIcon
									className='w-5 h-5 cursor-pointer stroke-2 animate-icon'
									onClick={handleSearchClick}
								/>
							</div>
							<div className='hidden md:block'>
								<p className='text-2xl font-semibold tracking-widest'>
									{getTitle()}
								</p>
							</div>
						</div>
						<div className='flex items-center justify-end md:min-w-48'>
							<MagnifyingGlassIcon
								className={`hidden animate-icon w-5 h-5 md:block md:mr-[40%] stroke-1 stroke-black ${
									isSearchVisible ? "hidden" : ""
								}`}
								onClick={handleSearchClick}
							/>
							<button
								type='button'
								onClick={handleClick}
								className={`${
									enabled ? "text-black" : "text-white"
								} absolute top-0 right-0 w-16 h-16 font-bold text-2xl pt-10 pr-10 rounded-sm cursor-pointer`}
								tabIndex={-1}>
								{isMenuOpen ? (
									<span>X</span>
								) : (
									<MenuBarsIcon barColor={barColor} />
								)}
							</button>
						</div>
					</header>
					<main>
						<ScrollUpBtn />
						<DarkModeBtn classes='bottom-24 md:opacity-0' />
						<Outlet />
					</main>
					<FooterWithTheme customStyle='uppercase bg-white bg-opacity-100' />
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
								tabIndex={-1}>
								X
							</button>

							{navigation.map((item) => (
								<Link
									key={item.name}
									to={
										item.href === "/fan"
											? userId
												? `/fan/${userId}`
												: "/login" // Redirect to login if userId is not available
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
			</LoadingLayout>
		</div>
	);
};

export default BothLayout;
