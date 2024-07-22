import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// This is important, because it cleans up state, etc. from components and prevents memory leaks, etc.
afterEach(() => {
	cleanup();
});

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
