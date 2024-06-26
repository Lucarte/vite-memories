import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const Fans = () => {
	const { auth } = useContext(AuthContext);

	return auth.isAdmin !== true ? (
		<article>
			<h1>List of Fans</h1>
			{/* Map through the list */}
		</article>
	) : (
		<>
			<Link to={"/login"} />
			<p>Admin Zone</p>
		</>
	);
};

export default Fans;
