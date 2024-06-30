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
import RootLayout from "./layouts/RootLayout";
import HomeLayout from "./layouts/HomeLayout";

// PAGES
import Login, { action as loginAction } from "./pages/Login";
import RootError from "./errors/RootError";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import Memories, { loader as memoriesLoader } from "./pages/Memories";
import Pablo from "./pages/Pablo";
import Gabriella from "./pages/Gabriella";
import NewMemory, { action as createMemoryAction } from "./pages/NewMemory";
import Fans from "./pages/Fans";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path='/' element={<RootLayout />} errorElement={<RootError />}>
				<Route path='/login' element={<Login />} action={loginAction} />
				<Route path='/registration' element={<Registration />} />
				<Route path='/gabriella' element={<Gabriella />} />
				<Route path='/pablo' element={<Pablo />} />
				<Route path='/memories'>
					<Route index element={<Memories />} loader={memoriesLoader} />
				</Route>
				<Route
					path='/memory/create'
					element={<NewMemory />}
					action={createMemoryAction}
				/>
			</Route>

			{/* Admin Routes */}
			<Route path='/fans' element={<Fans />} />

			{/* Not Found */}
			<Route path='*' element={<NotFound />} />
			<Route path='/' element={<HomeLayout />} errorElement={<RootError />}>
				<Route index element={<Home />} />
			</Route>
		</>
	)
);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider>
			<RouterProvider router={router} />
		</ThemeProvider>
	</React.StrictMode>
);
