type InputBoxProps = {
	classes?: string;
	label: {
		htmlFor: string;
		classes: string;
		text: string;
		children?: React.ReactElement;
	};
	input: {
		type: string;
		name: string;
		id: string;
		classes: string;
		placeholder?: string;
		checked?: boolean;
		value?: string;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	};
};

const InputBox = ({
	classes,
	label: { htmlFor, classes: labelClasses, text, children },
	input: {
		type,
		name,
		id,
		classes: inputClasses,
		placeholder,
		value,
		onChange,
	},
}: InputBoxProps) => {
	return (
		<>
			<div className={classes}>
				<input
					type={type}
					name={name}
					id={id}
					className={inputClasses}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
				<label htmlFor={htmlFor} className={labelClasses}>
					{text}
					{children}
				</label>
			</div>
		</>
	);
};

export default InputBox;
