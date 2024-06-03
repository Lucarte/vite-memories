type BtnProps = {
	type: "button" | "reset" | "submit";
	text: string;
	classes: string;
	children?: React.ReactElement;
	onClick?: () => void;
};

const CustomButton = ({ type, text, classes, children }: BtnProps) => {
	return (
		<button type={type} className={classes}>
			{text}
			{children}
		</button>
	);
};

export default CustomButton;
