import classNames from "classnames";
import { useTheme } from "../context/ThemeContext";

const MenuBarsIcon = () => {
	const { enabled } = useTheme();
	return (
		<div className='relative flex flex-col items-end w-6 h-6 gap-1 justify-normal '>
			{/* Larger bar */}
			<div
				className={classNames(
					enabled ? "bg-white" : "bg-black",
					"w-8 h-[.2em] rounded pl-1"
				)}
			/>
			{/* Medium bar, thicker, slightly rotated */}
			<div
				className={classNames(
					enabled ? "bg-white" : "bg-black",
					"w-6 h-[.2em] rounded transform rotate-[-5deg] mt-[1px]"
				)}
			/>
			{/* Smallest bar, thicker, more rotated */}
			<div
				className={classNames(
					enabled ? "bg-white" : "bg-black",
					"w-4 h-[.2em] rounded transform rotate-[-10deg]"
				)}
			/>
		</div>
	);
};

export default MenuBarsIcon;
