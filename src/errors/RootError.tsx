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
		<>
			<h1>Ooops! Something just broke!! UNKOWN ERROR</h1>
			<Link to='/'>Go Home</Link>
		</>
	);
};

export default RootError;
