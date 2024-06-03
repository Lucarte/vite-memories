type DropdownProps = {
	select: {
		id: string;
		name: string;
		value: string;
		onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
		classes: string;
	};
	options: string[];
};

const Dropdown = ({
	select: { id, name, value, onChange, classes },
	options,
}: DropdownProps) => {
	return (
		<div className='mt-2'>
			<select
				id={id}
				name={name}
				value={value}
				onChange={onChange}
				className={classes}>
				{options.map((option, index) => (
					<option key={index} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
};

export default Dropdown;
