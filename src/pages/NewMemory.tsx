import Category from "../components/Category";
import RadioInput from "../components/RadioInput";

const NewMemory = () => {
	return (
		<>
			<h1 className='mt-16 font-bold font-titles'>Create a New Memory</h1>
			<RadioInput />
			<Category />
		</>
	);
};

export default NewMemory;
