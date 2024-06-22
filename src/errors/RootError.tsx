import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

const RootError = () => {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return (
			<>
				<h1>Error: {error.status}</h1>
				<h2>Error StatusText: {error.statusText}</h2>
				<p>
					Please go back <Link to='/'>Home</Link>{" "}
				</p>
			</>
		);
	}
	return (
		<div className='flex flex-col items-center h-full gap-6 mt-44'>
			<h1 className='italic font-bold'>OOOPS!</h1>
			<p>UNKOWN ERROR</p>
			<Link to='/'>
				Just go back <span className='underline'>Home</span>
			</Link>
		</div>
	);
};

export default RootError;
