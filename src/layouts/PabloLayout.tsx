import MenuBarsIcon from "../components/MenuBarsIcon";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Link, Outlet } from "react-router-dom";
import classNames from "classnames";
import { navigation } from "../utils/navigation";
import DarkModeBtn from "../partials/DarkModeBtn";
import { loggedInData } from "../utils/api";
import Footer from "../partials/Footer";
import ScrollUpBtn from "../partials/ScrollUpBtn";
import logoBlack from "../assets/LogoWhite.svg";
import logoWhiteThick from "../assets/LogoBlack.svg";
import LoadingLayout from "./LoadingLayout";

export const loader = async () => {
	const { loggedIn, user } = await loggedInData();
	return { loggedIn, isAdmin: user?.isAdmin ?? false, user };
};

const PabloLayout = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { enabled } = useTheme();
	// Use Outlet context to get footer visibility state from child routes
	const [showFooter, setShowFooter] = useState(false);
	const [isMobile, setIsMobile] = useState<boolean>(false);

	useEffect(() => {
		// first check screen size
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth <= 1023);
		};
		// check initial size
		checkScreenSize();

		window.addEventListener("resize", checkScreenSize);

		// cleanup function
		return () => {
			window.removeEventListener("resize", checkScreenSize);
		};
	}, []);

	const handleClick = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<div className='h-screen overflow-hidden'>
			<LoadingLayout>
				<>
					<header className='flex items-center justify-between p-8'>
						{isMobile ? (
							<DarkModeBtn classes='bottom-4 left-2' />
						) : (
							<DarkModeBtn classes='bottom-20' />
						)}

						<ScrollUpBtn />
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
							<div className='block md:hidden'></div>
							<div className='hidden lg:block lg:text-xl lg:font-bold lg:tracking-wider lg:underline lg:uppercase'>
								<p>P.A.B.L.O.</p>
							</div>
						</div>
						{/* Menu in mobile && Menu and Search icon in other sizes */}
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
						<Outlet context={{ showFooter, setShowFooter }} />
					</main>
					{showFooter && <Footer />}
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
			</LoadingLayout>
		</div>
	);
};

export default PabloLayout;
