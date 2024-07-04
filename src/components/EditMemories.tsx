import { useAsyncValue } from "react-router-dom";
import { MemoryValues } from "../types/MemoryValues";
import EditSingleMemory from "./EditSingleMemory";

const EditMemories = () => {
	const memories = useAsyncValue() as MemoryValues[];

	return (
		<>
			{memories ? (
				memories.map((memory) => (
					<EditSingleMemory key={memory.title} memory={memory} />
				))
			) : (
				<p>No Memories found.</p>
			)}
		</>
	);
};

export default EditMemories;
