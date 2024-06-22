import { Outlet } from "react-router-dom";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useContext } from "react";
import { AuthContext, defaultAuth } from "../context/AuthProvider";
import http from "../utils/http";

const RootLayout = () => {
	const { auth, setAuth } = useContext(AuthContext);

	const handleLogout = async () => {
		try {
			await http.post("/api/auth/logout");
			setAuth(defaultAuth);
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<>
			<Header />
			<Footer handleLogout={handleLogout} />

			<Outlet />
		</>
	);
};

export default RootLayout;
