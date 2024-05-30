import React from "react";
import { NavLink } from "react-router-dom";

const RootError = () => {
	return (
		<>
			<h1>Ooops! Something just broke!!</h1>
			<NavLink to='/'>Go Home</NavLink>
		</>
	);
};

export default RootError;
