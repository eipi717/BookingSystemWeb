import React, {useState, useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {userLogin} from "../requests/request";
import {AuthContext} from "./AuthContext";

const Login = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");
    const { setIsAuth, setUser} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await userLogin(username, password);
            const token = response.token;
            localStorage.setItem("token", token);
            setIsAuth(true);
            setUser(username);
            navigate("/");
        } catch (error: any) {
            console.log(error.response.status)
            setErrorMsg("Invalid username or password. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                className="w-full max-w-md p-8 bg-white rounded shadow-md"
                onSubmit={handleSubmit}
            >
                <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className={`appearance-none border border-gray-200
                        rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className={`appearance-none border border-gray-200
                        rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                    {errorMsg && (
                        <p className="text-red-500 text-xs italic">{errorMsg}</p>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};


export {Login};