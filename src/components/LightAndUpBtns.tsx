import { useState } from "react";
import { Switch } from "@headlessui/react";
import classNames from "classnames";

const LightAndUpBtns = () => {
	const [enabled, setEnabled] = useState(false);

	return (
		<div className='fixed left-0 right-0 z-40 flex items-center justify-between pl-4 pr-5 md:px-8 bottom-20'>
			{/* Dark/Light Modus Button */}
			<div className='flex items-center justify-center w-10 h-8 rotate-90 bg-white md:rotate-0 rounded-xl'>
				<Switch
					checked={enabled}
					onChange={setEnabled}
					className={classNames(
						enabled ? "bg-white" : "bg-black",
						"inline-flex h-3 w-6 flex-shrink-0 cursor-pointer rounded-full border-[1px] border-transparent transition-colors duration-200 ease-in-out outline outline-2 focus:ring-2 focus:ring-orange-600"
					)}>
					<span className='sr-only'>Use setting</span>
					<span
						aria-hidden='true'
						className={classNames(
							enabled ? "translate-x-2.5 bg-black" : "translate-x-0  bg-white",
							"pointer-events-none inline-block h-2.5 w-2.5 transform rounded-full bg-black shadow ring-0 transition duration-200 ease-in-out"
						)}
					/>
				</Switch>
			</div>

			{/* Up Button */}
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='40'
				height='40'
				viewBox='0 0 35 35'>
				<g id='Home_Btn' data-name='Home Btn' transform='translate(-308 -3404)'>
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
		</div>
	);
};

export default LightAndUpBtns;
