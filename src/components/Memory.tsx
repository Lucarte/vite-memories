import {
	useLoaderData,
	LoaderFunctionArgs,
	LoaderFunction,
} from "react-router-dom";
import http from "../utils/http";
import { MemoryValues } from "../types/MemoryValues";
// import { getMemoryByTitle } from "../utils/api";

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

// export const loader: LoaderFunction = async ({
// 	params,
// }: LoaderFunctionArgs) => {
// 	return getMemoryByTitle();
// };
