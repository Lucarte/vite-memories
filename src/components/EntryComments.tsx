import Comment from "./Comment";

const EntryComments = () => {
	return (
		<article className='flex flex-col items-start'>
			<button className='px-2 py-1 mt-6 text-sm text-left bg-gray-600 rounded-md w-fit ml-9'>
				Show/Hide Commentaries
			</button>
			<Comment />
			<Comment />
			<Comment />
			<button className='px-2 py-1 mt-6 text-sm text-black bg-gray-400 rounded-md w-fit ml-9'>
				Add Comment
			</button>
		</article>
	);
};

export default EntryComments;
