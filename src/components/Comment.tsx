import AnswerEntry from "./AnswerEntry";

const Comment = () => {
	return (
		<article className='flex flex-row gap-3 mt-6 text-sm ml-9 font-extralight'>
			<div className='flex items-start'>
				<img src='#' alt='' className='bg-white rounded w-9 h-9' />
				{/* <img src='#' alt='avatar' /> */}
			</div>
			<div className='mr-9'>
				<div className='flex flex-col w-full text-gray-300'>
					{/* Muss mir das Datum von ?? geben lassen */}
					<p>June 15, 2021</p>
					{/* Muss mir die AutorIn Daten von DB holen */}
					<p>By: Mariana Lucht</p>
				</div>
				<div className='mt-2 text-left'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti eius
					temporibus vel. Debitis suscipit porro, asperiores iure ullam nulla
					voluptas rem, accusantium earum a est aspernatur eligendi sint? Dicta
					quibusdam illum magnam labore, vero possimus magni, eos ad officiis
					reiciendis maxime aut natus sapiente tenetur odio a nesciunt quaerat
					molestiae!
				</div>
				<button className='px-2 py-1 mt-4 text-sm text-left bg-gray-600 rounded-md w-fit'>
					Answer
				</button>
				<AnswerEntry />
			</div>
		</article>
	);
};

export default Comment;
