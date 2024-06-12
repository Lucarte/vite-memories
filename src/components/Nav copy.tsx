import { PopoverPanel } from "@headlessui/react";
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

type Props = {
	onClick: (page: string) => void;
};
const Nav = ({ onClick }: Props) => {
	return (
		<PopoverPanel as='nav' aria-label='Global'>
			<div className='max-w-3xl mx-auto space-y-1 text-2xl sm:px-4 '>
				{navigation.map((item) => (
					<a
						key={item.name}
						href='#'
						onClick={(e) => {
							e.preventDefault();
							onClick(item.page);
						}}
						aria-current={item.current ? "page" : undefined}
						className={classNames(
							item.current
								? "bg-gray-900 text-white"
								: "hover:text-white hover:bg-gray-900",
							"block rounded-md py-2 px-3 text-2xl uppercase font-medium"
						)}>
						{item.name}
					</a>
				))}
			</div>
		</PopoverPanel>
	);
};

export default Nav;
