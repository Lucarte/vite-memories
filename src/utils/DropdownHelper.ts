export const handleDropdownChange =
	(setter: React.Dispatch<React.SetStateAction<string>>) =>
	(e: React.ChangeEvent<HTMLSelectElement>) => {
		setter(e.target.value);
	};
