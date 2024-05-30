import { useState } from "react";
import { Switch } from "@headlessui/react";
import classNames from "classnames";

const LightUpBtns = () => {
	const [enabled, setEnabled] = useState(false);

	return (
		<div className='fixed bottom-[2rem] left-0 right-0 flex justify-between px-4 items-center'>
			{/* Dark/Light Modus Button */}
			<Switch
				checked={enabled}
				onChange={setEnabled}
				className={classNames(
					enabled ? "bg-white" : "bg-black",
					"inline-flex h-3 w-6 flex-shrink-0 cursor-pointer rounded-full border-[1px] border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-600"
				)}>
				<span className='sr-only'>Use setting</span>
				<span
					aria-hidden='true'
					className={classNames(
						enabled ? "translate-x-2.5 bg-black" : "translate-x-0  bg-white",
						"pointer-events-none inline-block h-2.5 w-2.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
					)}
				/>
			</Switch>

			{/* Up Button */}
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='35'
				height='35'
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
						stroke-width='2'
					/>
				</g>
			</svg>
		</div>
	);
};

export default LightUpBtns;
