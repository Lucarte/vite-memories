import MenuBarsIcon from "../components/MenuBarsIcon";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Link, Outlet } from "react-router-dom";
import classNames from "classnames";
import { navigation } from "../utils/navigation";
import { loggedInData } from "../utils/api";
import ScrollUpBtn from "../partials/ScrollUpBtn";
import logoBlack from "../assets/LogoWhite.svg";
import logoWhiteThick from "../assets/LogoBlack.svg";
import LoadingLayout from "./LoadingLayout";
import FooterWithTheme from "../HOC/FooterWithTheme";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Search from "../components/Search";

export const loader = async () => {
	const { loggedIn, user } = await loggedInData();
	return { loggedIn, isAdmin: user?.isAdmin ?? false, user };
};

const GabriellaLayout = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { enabled } = useTheme();
	// Use Outlet context to get footer visibility state from child routes
	const [showFooter, setShowFooter] = useState(false);
	const [isSearchVisible, setIsSearchVisible] = useState(false);
	const [, setLoggedIn] = useState(false);
	const [userId, setUserId] = useState<number | null>(null);

	const handleClick = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const barColor = enabled ? "bg-white" : "bg-black";

	const handleSearchClick = () => {
		setIsSearchVisible(!isSearchVisible);
	};

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
		<div className='h-screen overflow-hidden'>
			{isSearchVisible && (
				<div
					className={`${
						enabled ? "bg-white" : "bg-black"
					} fixed top-0 left-0 right-0 z-50 flex flex-col items-center h-full pb-12`}>
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
			<LoadingLayout>
				<>
					<header className='flex items-center justify-between p-8'>
						{/* Logo in mobile && Logo and Name description other sizes */}
						<div className='flex items-center justify-start md:min-w-48'>
							<Link to='/' className='-mt-[4px]'>
								{enabled ? (
									<img
										src={logoWhiteThick}
										className='w-11'
										alt='Logo White Thick'
									/>
								) : (
									<img src={logoBlack} className='w-11' alt='Logo Black' />
								)}
							</Link>
						</div>
						{/* Search icon in mobile && h1-tag in other sizes */}
						<div className='flex justify-center pr-4'>
							<div className='block pr-7 md:hidden'>
								<MagnifyingGlassIcon
									className='w-5 h-5 cursor-pointer animate-icon'
									onClick={handleSearchClick}
								/>
							</div>
							<div className='hidden lg:block lg:text-xl lg:font-bold lg:tracking-wider lg:underline lg:uppercase'>
								<p>G.A.B.I.</p>
							</div>
						</div>
						{/* Menu in mobile && Menu and Search icon in other sizes */}
						<div className='flex items-center justify-end md:min-w-48'>
							<MagnifyingGlassIcon
								className={`hidden animate-icon w-5 h-5 md:block md:mr-20 md:stroke-1 md:stroke-black ${
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
					<main className=''>
						<ScrollUpBtn />
						<Outlet context={{ showFooter, setShowFooter }} />
					</main>
					{showFooter && (
						<FooterWithTheme customStyle='uppercase bg-white bg-opacity-100' />
					)}
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

export default GabriellaLayout;
