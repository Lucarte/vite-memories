import { PopoverPanel } from "@headlessui/react";
import classNames from "classnames";

const user = {
	name: "Hugo Moreno",
	email: "h.moreno@example.com",
	imageUrl:
		"https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
	{ name: "Users", href: "#", current: true },
	{ name: "Pablo", href: "#", current: false },
	{ name: "Gabriella", href: "#", current: false },
	{ name: "All Memories", href: "#", current: false },
	{ name: "Title List", href: "#", current: false },
	{ name: "Search", href: "#", current: false },
	{ name: "Register", href: "#", current: false },
	{ name: "Login", href: "#", current: false },
	{ name: "Logout", href: "#", current: false },
];
const userNavigation = [
	{ name: "Your Profile", href: "#" },
	{ name: "Sign out", href: "#" },
];

const Nav = () => {
	return (
		<PopoverPanel as='nav' className='lg:hidden' aria-label='Global'>
			<div className='mx-auto max-w-3xl space-y-1 px-2 pb-3 pt-2 sm:px-4'>
				{navigation.map((item) => (
					<a
						key={item.name}
						href={item.href}
						aria-current={item.current ? "page" : undefined}
						className={classNames(
							item.current ? "bg-gray-100 text-gray-900" : "hover:bg-gray-50",
							"block rounded-md py-2 px-3 text-base font-medium"
						)}>
						{item.name}
					</a>
				))}
			</div>
			<div className='border-t border-gray-200 pb-3 pt-4'>
				<div className='mx-auto gap-3 flex max-w-3xl justify-center flex-col items-center px-4 sm:px-6'>
					<div className='flex-shrink-0'>
						<img
							className='h-10 w-10 rounded-full'
							src={user.imageUrl}
							alt=''
						/>
					</div>
					<div className='text-base font-medium text-gray-800'>{user.name}</div>
				</div>
				<div className='mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4'>
					{userNavigation.map((item) => (
						<a
							key={item.name}
							href={item.href}
							className='block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900'>
							{item.name}
						</a>
					))}
				</div>
			</div>
		</PopoverPanel>
	);
};

export default Nav;
