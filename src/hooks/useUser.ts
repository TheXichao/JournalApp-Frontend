
import { useContext } from "react";
import Cookies from "universal-cookie";

export interface User {
    user_id: number;
    email: string;
    first_name: string;
    last_name: string;
    authToken?: string;
  }
export default function useUser() {
    const cookies = new Cookies();

    const addUser = (user: User) => {
        cookies.set("user", user, { path: "/" });
        console.log("User added");
    }

    const removeUser = () => {
        cookies.remove("user");
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