import { useTheme } from "../context/ThemeContext";
const ScrollUpBtn = () => {
	const { enabled } = useTheme();

	return (
		<div className='fixed z-40 flex right-3 i md:pr-8 bottom-20'>
			{enabled ? (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='35'
					height='35'
					viewBox='0 0 35 35'>
					<g
						id='Home_Btn'
						data-name='Home Btn'
						transform='translate(-308 -3404)'>
						<circle
							id='Ellipse_1'
							data-name='Ellipse 1'
							cx='17.5'
							cy='17.5'
							r='17.5'
							transform='translate(308 3404)'
						/>
						<path
							id='Icon_material-keyboard-arrow-up'
							data-name='Icon material-keyboard-arrow-up'
							d='M12.948,28.352,18,13l5.007,15.185.02.062.036.109L24,21.761,18,8.4,12.221,21.761Z'
							transform='translate(307.779 3403.604)'
							fill='#f77403'
							stroke='#f77403'
							strokeWidth='2'
						/>
					</g>
				</svg>
			) : (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='40'
					height='40'
					viewBox='0 0 35 35'>
					<g
						id='Home_Btn'
						data-name='Home Btn'
						transform='translate(-308 -3404)'>
						<circle
							id='Ellipse_1'
							data-name='Ellipse 1'
							cx='17.5'
							cy='17.5'
							r='17.5'
							transform='translate(308 3404)'
							fill='#fff'
						/>
						<path
							id='Icon_material-keyboard-arrow-up'
							data-name='Icon material-keyboard-arrow-up'
							d='M12.948,28.352,18,13l5.007,15.185.02.062.036.109L24,21.761,18,8.4,12.221,21.761Z'
							transform='translate(307.779 3403.604)'
							fill='#f77403'
							stroke='#f77403'
							strokeWidth='2'
						/>
					</g>
				</svg>
			)}
		</div>
	);
};
export default ScrollUpBtn;
