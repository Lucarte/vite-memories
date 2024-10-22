import editIcon from "../assets/EditIcon.svg";
const EntryHeader = () => {
	return (
		<>
			<div className='flex content-center justify-between w-full px-9'>
				<a href='#' className=''>
					{/* <img src='#' alt='link to edit entry' /> */}
					<img src={editIcon} alt='link to edit entry' />
				</a>
				<div className='flex justify-center'>
					<img src='#' alt='' className='w-8 h-8 bg-white rounded' />
				</div>
			</div>
			{/* change color of the text to the bg of the edit icon */}
			<div className='flex flex-col items-end w-full -mt-5 text-gray-700 pr-9'>
				{/* Muss mir das Datum von ?? geben lassen */}
				<p>June 15, 2021</p>
				{/* Muss mir die AutorIn Daten von DB holen */}
				<p>By: Mariana Lucht</p>
			</div>
		</>
	);
};

export default EntryHeader;
