import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuBarsIcon from "./MenuBarsIcon";
import { useEffect, useState } from "react";
import Nav from "./Nav";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
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

	return (
		<>
			<header className='flex items-center justify-between'>
				{/* Logo in mobile && Logo and Name description other sizes */}
				<div className='flex items-center justify-start md:min-w-48'>
					<a href='#' className='-ml-2'>
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
					<p className='hidden md:block md:ml-10'>
						{/* B.R.U.N.N.I.S. */}
						{/* G.A.B.I. */}
						P.A.B.L.O.
					</p>
				</div>
				{/* Lupe in mobile && h1-tag in other sizes */}
				<div className='flex justify-center'>
					<div className='block md:hidden'>
						<MagnifyingGlassIcon className='w-5 h-5 mr-4 color-black' />
					</div>
					<div className='hidden md:block'>
						{/* <p>A.L.L..P.O.S.T.S</p> */}
						<p>G.A.B.I.</p>
						{/* <p>P.A.B.L.O.</p> */}
					</div>
				</div>
				{/* Menu in mobile && Menu and Lupe in other sizes */}
				<div className='flex items-center justify-end md:min-w-48'>
					<MagnifyingGlassIcon className='hidden w-5 h-5 md:block color-black md:mr-10' />
					<button type='button' onClick={handleClick} className='z-50'>
						{isMenuOpen ? (
							<XMarkIcon
								className='block text-white rounded-sm w-7 h-7 hover:bg-white hover:text-black'
								aria-hidden='true'
							/>
						) : (
							<MenuBarsIcon />
						)}
					</button>
				</div>
			</header>
			{isMenuOpen && <Nav onClick={() => setIsMenuOpen(false)} />}
		</>
	);
};

export default Header;
