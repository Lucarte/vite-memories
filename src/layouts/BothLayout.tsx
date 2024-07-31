import MenuBarsIcon from "../components/MenuBarsIcon";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Link, Outlet } from "react-router-dom";
import classNames from "classnames";
import DarkModeBtn from "../partials/DarkModeBtn";
import Footer from "../partials/Footer";
import { loggedInData } from "../utils/api";
import { navigation } from "../utils/navigation";
import ScrollUpBtn from "../partials/ScrollUpBtn";
import LoadingLayout from "./LoadingLayout";
import logoWhiteThick from "../assets/LogoBlack.svg";
import logoBlack from "../assets/LogoWhite.svg";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Search from "../components/Search";

export const loader = async () => {
	const { loggedIn, user } = await loggedInData();
	return { loggedIn, isAdmin: user?.isAdmin ?? false, user };
};

const BothLayout: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { enabled } = useTheme();
	const [isSearchVisible, setIsSearchVisible] = useState(false);
	// const [showFooter, setShowFooter] = useState(false);

	const handleClick = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleSearchClick = () => {
		setIsSearchVisible(!isSearchVisible);
	};

	return (
		<div className='border-8 border-black dark:border-white md:border-none'>
			<LoadingLayout>
				<>
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
					<header className='flex items-center justify-between p-8'>
						<DarkModeBtn classes='bottom-24' />
						<ScrollUpBtn />
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
							{/* <p className='hidden md:block md:ml-10'>B.R.U.N.N.I.S</p> */}
						</div>
						<div className='flex justify-center pr-4'>
							<div className='block md:hidden'>
								{" "}
								<MagnifyingGlassIcon
									className='w-5 h-5 cursor-pointer mr-7'
									onClick={handleSearchClick}
								/>
							</div>
							<div className='hidden md:block'>
								<p className='text-2xl font-semibold tracking-widest'>
									.B.R.U.N.N.I.S..P.O.S.T.S.
								</p>
							</div>
						</div>
						<div className='flex items-center justify-end md:min-w-48'>
							<MagnifyingGlassIcon
								className={`hidden w-5 h-5 md:block md:mr-[40%] stroke-1 stroke-black ${
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
								{isMenuOpen ? <span>X</span> : <MenuBarsIcon />}
							</button>
						</div>
					</header>
					<main>
						{/* <Outlet context={{ showFooter, setShowFooter }} /> */}
						<Outlet />
					</main>
					{/* {showFooter && <Footer />} */}
					<Footer />
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
			</LoadingLayout>
		</div>
	);
};

export default BothLayout;
