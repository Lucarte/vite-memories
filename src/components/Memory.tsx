import {
	useLoaderData,
	LoaderFunctionArgs,
	LoaderFunction,
} from "react-router-dom";
import http from "../utils/http";
import { MemoryValues } from "../types/MemoryValues";

const Memory = () => {
	const memory = useLoaderData() as MemoryValues;

	return (
		<section>
			<h1>{memory.title}</h1>
			<p>{memory.description}</p>
			{/* {memory.file_paths.map((file_path)=>{
                return <img key={file_path} src={file_path} alt='' />;
            })}
             */}
		</section>
	);
};

export default Memory;

export const loader: LoaderFunction = async ({
	params,
}: LoaderFunctionArgs) => {
	try {
		const { title } = params;
		const res = await http.get(`api/auth/memories/${title}`);

		if (res.status !== 200) {
			throw new Error(`Failed to fetch memory with title: ${title}`);
		}

		return res.data || {};
	} catch (error) {
		console.error(`Error fetching memory with title:`, error);
		throw error; // This will be caught by react-router-dom and trigger the errorElement
	}
};
