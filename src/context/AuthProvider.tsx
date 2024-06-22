import { createContext, useState, ReactNode } from "react";

type Props = {
	children: ReactNode;
};

type Auth = {
	id: number | null;
	email: string | null;
	isAdmin: boolean | null;
};

type AuthContext = {
	auth: Auth;
	setAuth: React.Dispatch<React.SetStateAction<Auth>>;
};

export const defaultAuth: Auth = {
	id: null,
	email: null,
	isAdmin: null,
};

const defaultAuthContext = {
	auth: defaultAuth,
	setAuth: () => {},
} as AuthContext;

export const AuthContext = createContext<AuthContext>(defaultAuthContext);

const AuthProvider = ({ children }: Props) => {
	const [auth, setAuth] = useState<Auth>(defaultAuth);
	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
