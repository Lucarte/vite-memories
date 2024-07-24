/* eslint-disable react-refresh/only-export-components */
import { LoaderFunction, Outlet, useLoaderData } from "react-router-dom";
import Header from "../partials/Header";
import { loggedInData } from "../utils/api";
import Footer from "../partials/Footer";
import LoadingLayout from "./LoadingLayout";
import DarkModeBtn from "../partials/DarkModeBtn";

export const PublicNav = () => {
	return (
		<>
			<LoadingLayout>
				<>
					<Header />
					<DarkModeBtn classes='bottom-8' />
					<main className=''>
						<Outlet />
					</main>
				</>
			</LoadingLayout>
		</>
	);
};

const PrivateNav = () => {
	return (
		<>
			<LoadingLayout>
				<>
					<Header />
					<DarkModeBtn classes='bottom-24' />
					<main>
						<Outlet />
					</main>
					<Footer />
				</>
			</LoadingLayout>
		</>
	);
};

const AdminNav = () => {
	return (
		<>
			<LoadingLayout>
				<>
					<Header />
					<DarkModeBtn classes='bottom-24' />
					{/* <p className='mt-4 text-center text-orange-600'>Have fun, Admin!</p> */}
					<main className=''>
						<Outlet />
					</main>
					<Footer />
				</>
			</LoadingLayout>
		</>
	);
};

const RootLayout = () => {
	const { loggedIn, isAdmin, user } = useLoaderData() as {
		loggedIn: boolean;
		isAdmin: boolean;
		user: { id: number; firstName: string; lastName: string } | null;
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
