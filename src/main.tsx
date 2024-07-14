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
import Pablo, { loader as pabloMemoriesLoader } from "./pages/Pablo";
import Gabriella, {
	loader as gabriellaMemoriesLoader,
} from "./pages/Gabriella";
import NewMemory, {
	action as createMemoryAction,
	loader as newMemoryFormLoader,
} from "./pages/NewMemory";
import Fans, { loader as fansLoader } from "./pages/Fans";
import NotFound from "./pages/NotFound";
import Footer, { action as footerAction } from "./partials/Footer";
import SingleMemory, {
	loader as singleMemoryLoader,
} from "./components/SingleMemory";
import GabIntro from "./pages/GabIntro";
import PabloIntro from "./pages/PabloIntro";
import Both, { loader as bothMemoryloader } from "./pages/Both";
import BothIntro from "./pages/BothIntro";
import SingleFan, { loader as singleFanLoader } from "./pages/SingleFan";

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
				<Route path='/gabriella' element={<GabIntro />} />
				<Route path='/pablo' element={<PabloIntro />} />
				<Route path='/both' element={<BothIntro />} />
				<Route
					path='/memories/kid/:kid'
					element={<Gabriella />}
					loader={gabriellaMemoriesLoader}
				/>
				<Route
					path='/memories/kid/:kid'
					element={<Pablo />}
					loader={pabloMemoriesLoader}
				/>
				<Route
					path='/memories/kid/:kid'
					element={<Both />}
					loader={bothMemoryloader}
				/>
				<Route
					path='/memories'
					element={<Memories />}
					loader={memoriesLoader}
					action={memoriesAction}
				/>
				<Route
					path='/memories/title/:title'
					element={<SingleMemory />}
					loader={singleMemoryLoader}
				/>

				{/* Admin Routes */}
				<Route
					path='/memory/create'
					element={<NewMemory />}
					loader={newMemoryFormLoader}
					action={createMemoryAction}
				/>
				<Route path='/fans' element={<Fans />} loader={fansLoader} />
				<Route
					path='/fan/:id'
					element={<SingleFan />}
					loader={singleFanLoader}
				/>

				{/* Not Found */}
				<Route path='*' element={<NotFound />} loader={rootLoader} />
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
