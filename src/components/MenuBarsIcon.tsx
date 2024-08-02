import classNames from "classnames";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";

type Props = {
	classes?: string;
};

const MenuBarsIcon = ({ classes }: Props) => {
	const { enabled } = useTheme();
	const [isMdViewport, setIsMdViewport] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMdViewport(window.innerWidth > 768);
		};

		handleResize(); // Check initial size
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const barColor =
		enabled || (enabled && !isMdViewport) ? "bg-white" : "bg-black";

	return (
		<div
			className={`relative flex flex-col items-end w-6 h-6 gap-1 justify-normal ${classes}`}>
			{/* Larger bar */}
			<div className={classNames(barColor, "w-8 h-[.2em] rounded pl-1")} />
			{/* Medium bar, thicker, slightly rotated */}
			<div
				className={classNames(
					barColor,
					"w-6 h-[.2em] rounded transform rotate-[-5deg] mt-[1px]"
				)}
			/>
			{/* Smallest bar, thicker, more rotated */}
			<div
				className={classNames(
					barColor,
					"w-4 h-[.2em] rounded transform rotate-[-10deg]"
				)}
			/>
		</div>
	);
};

export default MenuBarsIcon;
