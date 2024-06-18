import { useEffect } from "react";
import { useForm } from "react-hook-form";

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

type FormData = {
	categories: string[];
};

const Category = () => {
	const {
		register,
		getValues,
		setValue,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			categories: [],
		},
	});

	useEffect(() => {
		register("categories");
	}, [register]);

	const handleChange = (category: string) => {
		const currentCategories = getValues("categories") as string[];
		const index = currentCategories.indexOf(category);
		if (index === -1) {
			// Category not found, add it
			const updatedCategories = [...currentCategories, category];
			setValue("categories", updatedCategories);
		} else {
			// Category found, remove it
			const updatedCategories = currentCategories.filter(
				(cat) => cat !== category
			);
			setValue("categories", updatedCategories);
		}
	};

	return (
		<article className='mt-10 font-light'>
			<fieldset className='relative flex flex-wrap justify-center w-full p-4 pt-6 border-[2.5px] rounded-[3px] border-black'>
				<legend className='absolute flex px-2 text-sm text-black bg-white -top-3 left-4'>
					Category
				</legend>
				{categories.map((item) => (
					<label
						key={item}
						htmlFor={`category-${item}`}
						className={`flex px-3 mx-2 my-1 text-white bg-black border border-black rounded cursor-pointer w-fit ${
							errors.categories ? "bg-red-200" : ""
						} ${
							getValues("categories").includes(item)
								? "bg-white text-black"
								: "bg-black text-white"
						} hover:bg-white hover:text-black`}>
						{item}
						<input
							id={`category-${item}`}
							className='hidden'
							type='checkbox'
							{...register("categories")}
							onChange={() => handleChange(item)}
							checked={getValues("categories").includes(item)}
						/>
					</label>
				))}
			</fieldset>
			{errors.categories && (
				<p className='mt-1 text-sm text-red-500'>
					Please select at least one category.
				</p>
			)}
		</article>
	);
};

export default Category;
