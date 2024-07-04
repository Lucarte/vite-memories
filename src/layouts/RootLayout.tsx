import { LoaderFunction, Outlet, useLoaderData } from "react-router-dom";
import Header from "../partials/Header";
import { loggedInData } from "../utils/api";
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
			<main>
				<Outlet />
				<Footer />
			</main>
		</>
	);
};

const AdminNav = () => {
	return (
		<>
			<Header />
			<p className='mt-4 text-center text-orange-600'>Have fun, Admin!</p>
			<main>
				<Outlet />
				<Footer />
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
	const response = await loggedInData();
	return response;
};
