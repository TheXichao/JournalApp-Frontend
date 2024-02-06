import { useContext } from "react";
import { set } from "react-hook-form";
import Cookies from "universal-cookie";
import useUserContext from "./useUserContext";

export interface User {
    user_id: number;
    email: string;
    first_name: string;
    last_name: string;
    authToken?: string;
  }
export default function useUser() {
    const { updateUser } = useUserContext();

    const cookies = new Cookies();

    const addUser = (user: User) => {
        cookies.set("user", user, { path: "/" });
        updateUser(user);
        console.log("User added");
    }

    const removeUser = () => {
        cookies.remove("user");
        updateUser(null);
        console.log("User removed");
    }
    const getUser = (): User | undefined  => {
        return cookies.get("user");
    }

    return {
        addUser,
        removeUser,
        getUser
    }
}