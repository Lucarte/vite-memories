import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import MenuBarsIcon from "../components/MenuBarsIcon";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Link, useParams } from "react-router-dom";
import { loggedInData, getMemoryByTitle } from "../utils/api";
import classNames from "classnames";
import { navigation } from "../utils/navigation";
import Search from "../components/Search";
import logoBlack from "../assets/LogoWhite.svg";
import logoWhiteThick from "../assets/LogoBlack.svg";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [, setLoggedIn] = useState(false);
	const [userId, setUserId] = useState<number | null>(null);
	const [isSearchVisible, setIsSearchVisible] = useState(false);
	const { enabled } = useTheme();
	const [isMdViewport, setIsMdViewport] = useState(window.innerWidth > 768);
	const [kidName, setKidName] = useState("");
	const [memoryTitle, setMemoryTitle] = useState("");
	const [memoryId, setMemoryId] = useState<number | null>(null);

	const { title } = useParams();

	const handleResize = () => {
		setIsMdViewport(window.innerWidth > 768);
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

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

	useEffect(() => {
		const fetchMemoryData = async () => {
			if (title) {
				try {
					const memoryData = await getMemoryByTitle(title);
					setMemoryTitle(memoryData.title);
					setMemoryId(memoryData.id);
					setKidName(formatKidName(memoryData.kid));
				} catch (error) {
					console.error("Failed to fetch memory data:", error);
				}
			}
		};

		fetchMemoryData();
	}, [title]);

	const formatKidName = (kid: string) => {
		switch (kid) {
			case "Pablo":
				return "P.A.B.L.O";
			case "Gabriella":
				return "G.A.B.I";
			case "Both":
				return "B.R.U.N.N.I.S";
			default:
				return kid;
		}
	};

	const handleClick = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleSearchClick = () => {
		setIsSearchVisible(!isSearchVisible);
	};

	const barColor = enabled
		? isMdViewport
			? "bg-black"
			: "bg-white"
		: !isMdViewport
		? "bg-black"
		: "bg-black";

	const logoSrc = enabled
		? isMdViewport
			? logoBlack
			: logoWhiteThick
		: logoBlack;

	const logoAlt = enabled && !isMdViewport ? "Logo White Thick" : "Logo Black";

	return (
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
			<header className='relative z-40 flex items-center justify-between p-8'>
				<div className='flex items-center justify-start md:min-w-48'>
					<Link to='/' className='-mt-[4px]'>
						<img src={logoSrc} className='w-11' alt={logoAlt} />
					</Link>
					<p className='hidden md:block md:ml-10 md:text-lg md:font-semibold'>
						{kidName}
					</p>
				</div>
				<div className='flex justify-center pr-4 md:pb-3'>
					<div className='block md:hidden pr-7'>
						<MagnifyingGlassIcon
							className='w-5 h-5 cursor-pointer animate-icon'
							onClick={handleSearchClick}
						/>
					</div>
					<div className='hidden md:block md:text-xl md:font-semibold md:tracking-widest'>
						<p>
							<span className='font-serif text-3xl font-bold'>
								{memoryId ? `${memoryId}. ` : ""}
							</span>
							<span className='text-lg'>{memoryTitle}</span>
						</p>
					</div>
				</div>
				<div className='flex items-center justify-end md:pb-2 md:min-w-48'>
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
						} absolute top-0 right-0 w-16 h-16 font-bold text-2xl pt-10 md:pt-8 pr-10 rounded-sm cursor-pointer`}
						tabIndex={-1}>
						{isMenuOpen ? <span>X</span> : <MenuBarsIcon barColor={barColor} />}
					</button>
				</div>
			</header>

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
	);
};

export default Header;
