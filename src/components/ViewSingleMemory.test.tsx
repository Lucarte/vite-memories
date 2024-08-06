import { describe, it, expect, vi } from "vitest"; // Import Vitest functions
import { render, screen } from "../utils/testUtils";
import ViewSingleMemory from "../components/ViewSingleMemory";
import { ThemeProvider } from "../context/ThemeContext";
import { MemoryValues } from "../types/MemoryValues";

// Mock data
const mockMemory: MemoryValues = {
	id: 1,
	kid: "123",
	title: "Sample Memory",
	description: "This is a description of the memory.",
	year: 2024,
	month: "January",
	day: 1,
	created_at: "2024-01-01T00:00:00Z",
	updated_at: "2024-01-01T00:00:00Z",
	user_id: 1,
	files: [],
	urls: [],
	category_ids: ["cat1"],
	message: "Sample message",
	user: {
		id: 1,
		first_name: "John",
		last_name: "Doe",
		avatar: {
			avatar_path: "avatar.png",
		},
		isAdmin: false,
	},
	intent: "Sample Intent",
};

describe("Component: ViewSingleMemory", () => {
	it("should render the ViewSingleMemory component with given props", () => {
		render(
			<ThemeProvider>
				<ViewSingleMemory memory={mockMemory} />
			</ThemeProvider>
		);

		// Check if user name and avatar are rendered
		expect(screen.getByText(/by: john doe/i)).toBeInTheDocument();
		expect(screen.getByText(/january 1, 2024/i)).toBeInTheDocument();
		expect(screen.getByText(/sample memory/i)).toBeInTheDocument();
		expect(
			screen.getByText(/this is a description of the memory/i)
		).toBeInTheDocument();
	});

	it("should apply light theme styles", () => {
		// Mock the ThemeContext to return light theme
		render(
			<ThemeProvider>
				<ViewSingleMemory memory={mockMemory} />
			</ThemeProvider>
		);

		// Check if the component applies light theme styles
		expect(screen.getByText(/sample memory/i)).toHaveClass("text-black");
		expect(
			screen.getByText(/this is a description of the memory/i)
		).toHaveClass("text-black");
	});

	it('should display "No files available" when there are no files', () => {
		render(
			<ThemeProvider>
				<ViewSingleMemory memory={mockMemory} />
			</ThemeProvider>
		);

		expect(screen.getByText(/no files available/i)).toBeInTheDocument();
	});

	it('should display "No URLs available" when there are no URLs', () => {
		render(
			<ThemeProvider>
				<ViewSingleMemory memory={mockMemory} />
			</ThemeProvider>
		);

		expect(screen.getByText(/no urls available/i)).toBeInTheDocument();
	});
});
