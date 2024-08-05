/* eslint-disable react-refresh/only-export-components */
import { LoaderFunction, Outlet, useLoaderData } from "react-router-dom";
import Header from "../partials/Header";
import { loggedInData } from "../utils/api";
import LoadingLayout from "./LoadingLayout";
import DarkModeBtn from "../partials/DarkModeBtn";
import PublicNavHeader from "../components/PublicNavHeader";
import FooterWithTheme from "../HOC/FooterWithTheme";

export const PublicNav = () => {
	return (
		<div className='min-h-screen'>
			<LoadingLayout>
				<>
					<PublicNavHeader />
					<DarkModeBtn classes='bottom-8' />
					<main className=''>
						<Outlet />
					</main>
				</>
			</LoadingLayout>
		</div>
	);
};

const PrivateNav = () => {
	return (
		<div className='min-h-screen border-8 border-black dark:md:bg-white dark:md:text-black md:border-white dark:border-white dark:md:border-white'>
			<LoadingLayout>
				<>
					<Header />
					<DarkModeBtn classes='bottom-24 md:opacity-0' />
					<main>
						<Outlet />
					</main>
					<FooterWithTheme />
				</>
			</LoadingLayout>
		</div>
	);
};

const AdminNav = () => {
	return (
		<div className='min-h-screen border-8 border-black dark:md:bg-white dark:md:text-black md:border-white dark:border-white dark:md:border-white'>
			<LoadingLayout>
				<>
					<Header />
					<DarkModeBtn classes='bottom-24 md:opacity-0' />
					<main className=''>
						<Outlet />
					</main>
					<FooterWithTheme />
				</>
			</LoadingLayout>
		</div>
	);
};

const RootLayout = () => {
	const { loggedIn, isAdmin } = useLoaderData() as {
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
