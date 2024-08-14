import { render, screen } from "../utils/testUtils";
import { ThemeProvider } from "../context/ThemeContext";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Login from "../pages/Login";

// Definiere die Routen für den RouterProvider
const routes = [
	{
		path: "/login",
		element: <Login />,
	},
];

const router = createMemoryRouter(routes, {
	initialEntries: ["/login"],
});

describe("Component: Login", () => {
	it("should render Login correctly", () => {
		render(
			<ThemeProvider>
				<RouterProvider router={router} />
			</ThemeProvider>
		);

		const heading = screen.getByRole("heading", { level: 1 });
		expect(heading).toBeInTheDocument();
		const emailInput = screen.getByLabelText(/e-mail/i);
		expect(emailInput).toBeInTheDocument();

		const passwordInput = screen.getByLabelText(/password/i);
		expect(passwordInput).toBeInTheDocument();

		const submitButton = screen.getByRole("button", {
			name: /enter memories portal/i,
		});
		expect(submitButton).toBeInTheDocument();
	});
});
