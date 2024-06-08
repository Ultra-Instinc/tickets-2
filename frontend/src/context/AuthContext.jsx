import { createContext, useContext, useState } from "react";

// initialize the context
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUser] = useState(
		JSON.parse(localStorage.getItem("chat-user")) || null
	);
	return (
		<AuthContext.Provider value={{ authUser, setAuthUser }}>
			{children}
		</AuthContext.Provider>
	);
};
// allow context values to be accessable in the app
export const useAuthContext = () => {
	return useContext(AuthContext);
};
