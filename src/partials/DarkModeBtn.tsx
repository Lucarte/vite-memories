import classNames from "classnames";
import { useTheme } from "../context/ThemeContext";
import { Switch } from "@headlessui/react";

const DarkModeBtn = () => {
	const { enabled, setEnabled } = useTheme();

	return (
		<div
			className={classNames(
				enabled ? "bg-black" : "bg-white",
				"flex items-center justify-center w-10 h-8 rotate-90 md:rotate-0 rounded-xl fixed bottom-20 left-2 z-40 md:pl-8"
			)}>
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
	);
};

export default DarkModeBtn;
