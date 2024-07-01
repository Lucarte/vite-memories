import EntryBody from "../components/EntryBody";
import EntryComments from "../components/EntryComments";
import EntryHeader from "../components/EntryHeader";

const SingleEntry = () => {
	return (
		<article className='flex flex-col items-center gap-6 pt-16'>
			<EntryHeader />
			<EntryBody />
			<EntryComments />
			<button
				className='flex px-3 py-1 my-10 text-black bg-red-600 rounded-md w-fit'
				type='button'>
				Delete Memory
			</button>
		</article>
	);
};

export default SingleEntry;
