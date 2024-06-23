import classNames from "classnames";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext, defaultAuth } from "../context/AuthProvider";

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
	const handleClick = () => {
		onClick();
	};

	return (
		<nav className='absolute top-0 right-0 z-50 flex flex-col justify-center w-full h-full px-12 overflow-auto text-white bg-black shadow-md lg:w-1/2'>
			{navigation.map((item) => (
				<Link
					key={item.name}
					to={item.href}
					aria-current={item.current ? "page" : undefined}
					onClick={() => handleClick()}
					className={classNames(
						item.current
							? "bg-gray-900 text-white"
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
