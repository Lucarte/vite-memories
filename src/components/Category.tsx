import CustomButton from "./CustomButton";

const categories = [
	"Musical Theater",
	"Art",
	"Various",
	"Dance",
	"Music",
	"Sports",
	"Viola",
	"Programming",
];

const handleClick = () => {
	console.log(categories);
};

const Category = () => {
	return (
		<article className='mt-10'>
			<fieldset className='relative w-full p-4 pt-8 border border-black'>
				<legend className='absolute flex flex-wrap px-2 text-sm text-black bg-white -top-3 left-4'>
					Category
				</legend>
				{categories.map((item) => (
					// <div className='flex justify-between'>
					<CustomButton
						key={item}
						type='button'
						text={item}
						classes='border-black border px-3 my-1 rounded mx-2 '
						onClick={handleClick}
					/>
					// </div>
				))}
			</fieldset>
		</article>
	);
};

export default Category;
