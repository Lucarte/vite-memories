import classNames from "classnames";

type Props = {
	classes?: string;
	barColor: string;
};

const MenuBarsIcon = ({ classes, barColor }: Props) => {
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
