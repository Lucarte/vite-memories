import classNames from "classnames";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const navigation = [
	{ name: "Brunnis", href: "/memories/{kid}", page: "Brunnis", current: false },
	{ name: "Pablo", href: "/pablo", page: "Pablo", current: false },
	{
		name: "Gabriella",
		href: "/gabriella",
		page: "Gabriella",
		current: false,
	},
	{
		name: "Memories",
		href: "/memories",
		page: "AllMemories",
		current: false,
	},
	{
		name: "Title List",
		href: "/memories/{title}",
		page: "TitleList",
		current: false,
	},
	{ name: "My Profile", href: "/fan/{id}", page: "MyProfile", current: false },
	{ name: "Search", href: "/search", page: "Search", current: false },
	{ name: "Login", href: "/login", page: "Login", current: false },
	{ name: "Register", href: "/registration", page: "Register", current: false },
];

type NavProps = {
	onClick: () => void;
};

const Nav = ({ onClick }: NavProps) => {
	const { enabled } = useTheme();

	const handleClick = () => {
		onClick();
	};

	return (
		<nav
			className={`${
				enabled ? "bg-white text-black" : "bg-black text-white"
			} absolute top-0 right-0 z-50 flex flex-col justify-center w-full h-full px-12 overflow-auto text-white bg-black shadow-md lg:w-1/2`}>
			{/* <XMarkIcon
				onClick={}
				className='absolute top-0 right-0 z-50 w-20 h-20 pt-10 pr-10 text-white rounded-sm hover:bg-black hover:text-white'
				aria-hidden='true'
			/> */}
			{navigation.map((item) => (
				<Link
					key={item.name}
					to={item.href}
					aria-current={item.current ? "page" : undefined}
					onClick={() => handleClick()}
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
	);
};

export default Nav;
