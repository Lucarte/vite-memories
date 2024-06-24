import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuBarsIcon from "../components/MenuBarsIcon";
import { useEffect, useState } from "react";
import Nav from "./Nav";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { enabled } = useTheme();
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
			<header className='flex items-center justify-between p-8'>
				{/* Logo in mobile && Logo and Name description other sizes */}
				<div className='flex items-center justify-start md:min-w-48'>
					<Link to='/' className='-ml-2'>
						{/* <a href='#' className='-ml-2'> */}
						{enabled ? (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='35.993'
								height='35.391'
								viewBox='0 0 299.993 271.391'>
								<g
									id='Group_4'
									data-name='Group 4'
									transform='translate(4.353 15)'>
									<text
										id='P'
										transform='translate(8.647 64)'
										fill='#fff'
										font-size='80'
										font-family='Luminari-Regular, Luminari'>
										<tspan x='0' y='0'>
											P
										</tspan>
									</text>
									<path
										id='Line_10'
										data-name='Line 10'
										d='M174.823,5H0A5,5,0,0,1-5,0,5,5,0,0,1,0-5H174.823a5,5,0,0,1,5,5A5,5,0,0,1,174.823,5Z'
										transform='translate(22.5 248.5)'
										fill='#fff'
									/>
									<path
										id='Line_12'
										data-name='Line 12'
										d='M99.2,90.192a4.98,4.98,0,0,1-3.255-1.207L-3.258,3.793a5,5,0,0,1-.536-7.051,5,5,0,0,1,7.051-.536l99.2,85.192a5,5,0,0,1-3.26,8.793Z'
										transform='translate(176.323 9.5)'
										fill='#fff'
									/>
									<path
										id='Line_14'
										data-name='Line 14'
										d='M0,162H-.006A5,5,0,0,1-5,156.994l.177-157A5,5,0,0,1,.182-5,5,5,0,0,1,5.177.006L5,157.006A5,5,0,0,1,0,162Z'
										transform='translate(22.323 88.5)'
										fill='#fff'
									/>
									<text
										id='G'
										transform='matrix(-0.052, 0.999, -0.999, -0.052, 216.749, 190.341)'
										fill='#fff'
										font-size='80'
										font-family='Luminari-Regular, Luminari'>
										<tspan x='0' y='0'>
											G
										</tspan>
									</text>
									<path
										id='Path_24'
										data-name='Path 24'
										d='M0,94.281a5,5,0,0,1-5-5V0A5,5,0,0,1,0-5,5,5,0,0,1,5,0V89.281A5,5,0,0,1,0,94.281Z'
										transform='translate(276 95)'
										fill='#fff'
									/>
									<path
										id='Path_25'
										data-name='Path 25'
										d='M0,104.28a5,5,0,0,1-5-5V0A5,5,0,0,1,0-5,5,5,0,0,1,5,0V99.28A5,5,0,0,1,0,104.28Z'
										transform='translate(176.64 9.64) rotate(90)'
										fill='#fff'
									/>
								</g>
							</svg>
						) : (
							// <img src='../src/assets/LogoPathWhite.svg' alt='' />
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
						)}
					</Link>
					{/* </a> */}
					<p className='hidden md:block md:ml-10'>
						{/* B.R.U.N.N.I.S. */}
						{/* G.A.B.I. */}
						P.A.B.L.O.
					</p>
				</div>
				{/* Lupe in mobile && h1-tag in other sizes */}
				<div className='flex justify-center'>
					<div className='block md:hidden'>
						<MagnifyingGlassIcon className='w-5 h-5 mr-4' />
					</div>
					<div className='hidden md:block'>
						{/* <p>A.L.L..P.O.S.T.S</p> */}
						<p>G.A.B.I.</p>
						{/* <p>P.A.B.L.O.</p> */}
					</div>
				</div>
				{/* Menu in mobile && Menu and Lupe in other sizes */}
				<div className='flex items-center justify-end md:min-w-48'>
					<MagnifyingGlassIcon className='hidden w-5 h-5 md:block md:mr-10' />
					<button type='button' onClick={handleClick} className='z-50'>
						{isMenuOpen ? (
							<XMarkIcon
								className={`${
									enabled
										? "text-white hover:bg-white hover:text-black"
										: "text-black hover:bg-black hover:text-white"
								} absolute top-0 right-0 w-20 h-20 rounded-sm`}
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
