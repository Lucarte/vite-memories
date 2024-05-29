import "./App.css";
import classNames from "classnames";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import MenuBarsIcon from "./MenuBarsIcon";

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

export default function AppHeading() {
	return (
		<>
			{/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
			<Popover
				as='header'
				className={({ open }) =>
					classNames(
						open ? "fixed inset-0 z-40 overflow-y-auto" : "",
						"bg-white"
					)
				}>
				{({ open }) => (
					<>
						<div className='relative pr-2 flex justify-between lg:gap-8'>
							{/* Logo */}
							<div className='flex flex-shrink-0 items-center'>
								<a href='#'>
									<svg
										version='1.0'
										xmlns='http://www.w3.org/2000/svg'
										width='35.000000pt'
										height='35.000000pt'
										viewBox='0 0 272.000000 270.000000'
										preserveAspectRatio='xMidYMid meet'>
										<g
											transform='translate(0.000000,270.000000) scale(0.100000,-0.100000)'
											fill='#000000'
											stroke='none'>
											<path
												d='M821 2039 c-135 -133 -276 -272 -313 -309 l-68 -68 0 -384 c0 -212 3
														-387 6 -391 3 -3 23 3 42 14 20 10 49 19 64 19 l28 0 0 343 0 343 274 267 274
														267 279 0 280 0 32 45 c17 24 45 52 61 61 16 10 27 21 24 26 -3 4 -170 8 -371
														8 l-366 0 -246 -241z'
											/>
											<path
												d='M2324 2227 c-11 -14 -24 -33 -29 -42 -10 -17 -13 -17 -64 0 -77 25
														-198 17 -267 -18 -208 -106 -217 -389 -15 -480 71 -32 190 -30 256 4 63 34
														105 85 112 138 5 36 2 44 -29 75 -45 45 -123 63 -202 46 -58 -12 -106 -42
														-106 -66 0 -38 66 -66 114 -48 14 5 14 8 0 29 -39 60 55 92 98 34 25 -34 34
														-100 18 -139 -31 -74 -133 -95 -207 -41 -88 64 -116 228 -60 344 38 76 83 107
														154 107 44 0 58 -5 88 -31 40 -35 65 -77 65 -109 0 -37 18 -21 25 23 9 54 40
														125 67 155 15 16 19 25 11 33 -7 7 -16 3 -29 -14z'
											/>
											<path
												d='M2370 1598 c-6 -24 -14 -56 -18 -73 -5 -23 -19 -36 -59 -55 l-52 -25
														-3 -485 -3 -485 -493 -1 c-350 -1 -497 -5 -505 -13 -20 -20 -27 -12 -27 29 0
														23 -5 40 -11 40 -8 0 -10 -18 -7 -53 4 -41 18 -75 68 -162 76 -131 68 -120 77
														-111 4 4 -6 32 -22 63 -17 31 -31 59 -33 62 -1 3 236 6 528 6 495 0 530 1 547
														18 17 16 18 60 24 630 3 337 9 622 13 635 5 14 4 22 -2 22 -6 0 -16 -19 -22
														-42z'
											/>
											<path
												d='M508 755 c-60 -33 -88 -173 -53 -270 8 -22 15 -71 16 -110 1 -38 4
														-60 6 -47 3 13 16 27 29 33 32 11 386 11 478 -1 79 -10 87 -17 133 -112 27
														-55 43 -72 43 -46 0 7 -23 52 -51 102 -30 52 -58 118 -68 158 -17 71 -31 89
														-31 39 0 -36 -12 -41 -111 -41 l-79 0 0 58 c-1 97 -57 189 -142 233 -44 23
														-131 25 -170 4z m162 -76 c96 -21 146 -95 121 -180 l-12 -41 -141 4 c-133 3
														-141 5 -159 27 -31 38 -26 103 12 146 45 51 92 63 179 44z'
											/>
										</g>
									</svg>
								</a>
							</div>

							{/* Search Icon */}
							<div className='flex pr-6 py-4 md:pr-24'>
								<label htmlFor='search' className='sr-only'>
									Search
								</label>
								<div className='absolute flex justify-center items-center'>
									<MagnifyingGlassIcon
										className='h-5 w-5 text-black'
										aria-hidden='true'
									/>
								</div>
							</div>

							{/* Mobile menu button */}
							<div className='flex items-center md:absolute md:inset-y-0 md:right-0'>
								<PopoverButton className='relative -mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500'>
									<span className='-inset-0.5' />
									<span className='sr-only'>Open menu</span>
									{open ? (
										<XMarkIcon className='block h-6 w-6' aria-hidden='true' />
									) : (
										<MenuBarsIcon aria-hidden='true' />
									)}
								</PopoverButton>
							</div>
						</div>

						<PopoverPanel as='nav' className='lg:hidden' aria-label='Global'>
							<div className='mx-auto max-w-3xl space-y-1 px-2 pb-3 pt-2 sm:px-4'>
								{navigation.map((item) => (
									<a
										key={item.name}
										href={item.href}
										aria-current={item.current ? "page" : undefined}
										className={classNames(
											item.current
												? "bg-gray-100 text-gray-900"
												: "hover:bg-gray-50",
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
									<div className='text-base font-medium text-gray-800'>
										{user.name}
									</div>
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
					</>
				)}
			</Popover>
		</>
	);
}
