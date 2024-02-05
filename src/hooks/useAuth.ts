import { useEffect } from "react";
import { User } from "./useUser";
import useUser from "./useUser";
import { get } from "react-hook-form";

export default function useAuth() {
    const { getUser, addUser, removeUser } = useUser();

    const login = (user: User) => {
        addUser(user);
    }

    const logout = () => {
        removeUser();
    }

    const isAuthenticated = () => {
        return getUser() !== undefined;
    }

    return {
        login,
        logout,
        isAuthenticated
    }}