import { AuthContext } from "../context/AuthProvider";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";

const PrivateLayout = () => {
	const { auth } = useContext(AuthContext);
	const location = useLocation();
	return auth.id ? (
		<Outlet />
	) : (
		<>
			<Navigate to={"/login"} state={{ from: location }} replace />
		</>
	);
};

export default PrivateLayout;
