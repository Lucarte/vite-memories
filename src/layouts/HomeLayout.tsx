import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import MenuBarsIcon from "../components/MenuBarsIcon";
import { navigation } from "../utils/navigation";
import classNames from "classnames";
import DarkModeBtn from "../partials/DarkModeBtn";
import logoBlack from "../assets/LogoWhite.svg";
import logoWhiteThick from "../assets/LogoBlack.svg";
import LoadingLayout from "./LoadingLayout";

const HomeLayout = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { enabled } = useTheme();
	const [isMdViewport, setIsMdViewport] = useState(window.innerWidth > 768);

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

	useEffect(() => {
		if (isMenuOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
	}, [isMenuOpen]);

	const logoSrc = enabled
		? !isMdViewport
			? logoWhiteThick
			: logoWhiteThick
		: !isMdViewport
		? logoBlack
		: logoBlack;

	const logoAlt = enabled && !isMdViewport ? "Logo White Thick" : "Logo Black";
	const barColor = enabled ? "bg-white" : "bg-black";

	return (
		<>
			<LoadingLayout>
				<div className='min-h-screen border-8 border-black dark:border-white'>
					<header className='flex items-center justify-between p-8'>
						<DarkModeBtn classes='bottom-8 left-4' />
						{/* Logo in mobile && Logo and Name description other sizes */}
						<div className='flex items-center justify-start md:min-w-48'>
							<Link to='/' className='-mt-[4px]'>
								<img src={logoSrc} className='w-11' alt={logoAlt} />
							</Link>
						</div>

						{/* Menu in mobile && Menu and Search icon in other sizes */}
						<div className='flex items-center justify-end lg:justify-start lg:pb-2 lg:pl-16 md:min-w-48'>
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
					<main className='lg:flex lg:items-center lg:justify-center'>
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
				</div>
			</LoadingLayout>
		</>
	);
};

export default HomeLayout;
