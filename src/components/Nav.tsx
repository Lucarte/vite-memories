import classNames from "classnames";

const navigation = [
	{ name: "Login", href: "#", page: "Login", current: false },
	{ name: "Brunnis", href: "#", page: "Brunnis", current: false },
	{ name: "Pablo", href: "#", page: "Pablo", current: false },
	{ name: "Gabriella", href: "#", page: "Gabriella", current: false },
	{ name: "All Memories", href: "#", page: "AllMemories", current: false },
	{ name: "Title List", href: "#", page: "TitleList", current: false },
	{ name: "Search", href: "#", page: "Search", current: false },
	{ name: "Register", href: "#", page: "Register", current: false },
	{ name: "My Profile", href: "#", page: "MyProfile", current: false },
	{ name: "Sign Out", href: "#", page: "SignOut", current: false },
];

type OnClickProps = {
	onClick: () => void;
};

const Nav = ({ onClick }: OnClickProps) => {
	return (
		<nav className='absolute top-0 right-0 z-50 flex flex-col justify-center w-full h-full overflow-auto text-white bg-black shadow-md lg:w-1/2'>
			{navigation.map((item) => (
				<a
					key={item.name}
					href={item.href}
					onClick={(e) => {
						e.preventDefault();
						onClick();
					}}
					aria-current={item.current ? "page" : undefined}
					className={classNames(
						item.current
							? "bg-gray-900 text-white"
							: "hover:text-white hover:bg-gray-900",
						"block font-titles rounded-md py-2 px-3 text-2xl uppercase font-medium"
					)}>
					{item.name}
				</a>
			))}
		</nav>
	);
};

export default Nav;
