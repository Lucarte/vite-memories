import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
	createBrowserRouter,
	RouterProvider,
	createRoutesFromElements,
	Route,
} from "react-router-dom";

// CONTEXT
import { ThemeProvider } from "./context/ThemeContext";

// LAYOUTS
import RootLayout, { loader as rootLoader } from "./layouts/RootLayout";
import HomeLayout from "./layouts/HomeLayout";

// PAGES
import Login, { action as loginAction } from "./pages/Login";
import RootError from "./errors/RootError";
import Registration, { action as registerAction } from "./pages/Registration";
import Home from "./pages/Home";
import Memories, {
	loader as memoriesLoader,
	action as memoriesAction,
} from "./pages/Memories";
import Pablo from "./pages/Pablo";
import Gabriella from "./pages/Gabriella";
import NewMemory, {
	action as createMemoryAction,
	loader as newMemoryFormLoader,
} from "./pages/NewMemory";
import Fans from "./pages/Fans";
import NotFound from "./pages/NotFound";
import Footer, { action as footerAction } from "./partials/Footer";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route
				path='/'
				element={<RootLayout />}
				errorElement={<RootError />}
				loader={rootLoader}>
				<Route path='/login' element={<Login />} action={loginAction} />
				<Route
					path='/register'
					element={<Registration />}
					action={registerAction}
				/>
				<Route path='/logout' element={<Footer />} action={footerAction} />
				<Route path='/gabriella' element={<Gabriella />} />
				<Route path='/pablo' element={<Pablo />} />
				<Route
					path='/memories'
					element={<Memories />}
					loader={memoriesLoader}
					action={memoriesAction}
				/>

				{/* Admin Routes */}
				<Route
					path='/memory/create'
					element={<NewMemory />}
					loader={newMemoryFormLoader}
					action={createMemoryAction}
				/>
				<Route path='/fans' element={<Fans />} loader={rootLoader} />

				{/* Not Found */}
				<Route path='*' element={<NotFound />} />
			</Route>
			<Route path='/' element={<HomeLayout />} errorElement={<RootError />}>
				<Route index element={<Home />} />
			</Route>
		</>
	)
);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider>
			<RouterProvider router={router}></RouterProvider>
		</ThemeProvider>
	</React.StrictMode>
);
