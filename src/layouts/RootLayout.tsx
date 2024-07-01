import { LoaderFunction, Outlet, useLoaderData } from "react-router-dom";
import Header from "../partials/Header";
import { isLoggedIn, logout } from "../utils/api";
import Footer from "../partials/Footer";

const PublicNav = () => {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
		</>
	);
};

const PrivateNav = () => {
	return (
		<>
			<Header />
			{/* <p>Currently logged in.</p> */}
			<main>
				<Footer />
				<Outlet />
			</main>
		</>
	);
};

const AdminNav = () => {
	return (
		<>
			<Header />
			{/* <p>Currently logged in as Admin.</p> */}
			<main>
				<Footer />
				<Outlet />
			</main>
		</>
	);
};

const RootLayout = () => {
	const { loggedIn, isAdmin } = useLoaderData() as {
		loggedIn: boolean;
		isAdmin: boolean;
	};
	if (loggedIn) {
		return isAdmin ? <AdminNav /> : <PrivateNav />;
	} else {
		return <PublicNav />;
	}
};

export default RootLayout;

export const loader: LoaderFunction = async () => {
	return await isLoggedIn();
};
