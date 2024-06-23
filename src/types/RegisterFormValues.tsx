export type RegisterFormValues = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	passwordConfirmation: string;
	relationshipToKid: "Family" | "Friend" | "Teacher" | "Select a relationship.";
	terms: boolean;
	avatar_path: FileList | null;
};
