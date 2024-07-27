import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import http from "../utils/http";

type FormData = {
	categories: string[];
};

// Define type for the fetched categories
type CategoryType = {
	id: string;
	category: string;
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

	const [categories, setCategories] = useState<CategoryType[]>([]);

	useEffect(() => {
		register("categories");
	}, [register]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await http.get("/api/auth/categories");
				setCategories(response.data); // Adjust based on the actual response structure
			} catch (error) {
				console.error("Failed to fetch categories", error);
			}
		};

		fetchCategories();
	}, []);

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
						key={item.id} // Use a unique identifier for key
						htmlFor={`category-${item.id}`} // Ensure id matches the input's id
						className={`flex px-3 mx-2 my-1 text-white bg-black border border-black rounded cursor-pointer w-fit ${
							errors.categories ? "bg-red-200" : ""
						} ${
							getValues("categories").includes(item.category)
								? "bg-white text-black"
								: "bg-black text-white"
						} hover:bg-white hover:text-black`}>
						{item.category}
						<input
							id={`category-${item.id}`}
							className='hidden'
							type='checkbox'
							{...register("categories")}
							onChange={() => handleChange(item.category)}
							checked={getValues("categories").includes(item.category)}
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
