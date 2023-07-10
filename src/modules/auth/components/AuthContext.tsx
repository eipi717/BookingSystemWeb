import { createContext } from "react";

export const AuthContext = createContext({
    isAuth: false,
    setIsAuth: (setIsAuth: boolean) => {},
    user: "",
    setUser: (username: string) => {}
});

