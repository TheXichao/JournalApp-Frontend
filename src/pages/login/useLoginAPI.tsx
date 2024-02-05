import { useEffect, useState } from "react";
import { myApiCall } from "../../api/axios";
import axios from "axios";

interface User {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export function useLoginAPI(
  userData: {
    email: string;
    password: string;
  },
  trigger: boolean = false
): {
  isLoading: boolean;
  error: any;
  token: string | null;
  userInfo: User | null;
} {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [token, setToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    if (trigger === true && userData.email && userData.password) {
      const login = async () => {
        setIsLoading(true);

        const headers: { [key: string]: string } = {
          "Content-Type": "application/json",
        };

        try {
          const response = await myApiCall.post(
            `/user/login/`,
            { email: userData.email, password: userData.password },
            { headers }
          );
          const loginResponse = response.data as LoginResponse;
          setToken(loginResponse.token);
          setUserInfo(loginResponse.user);
        } catch (error: any) {
          if (axios.isCancel(error)) {
            return;
          }

          setError(error);
        } finally {
          setIsLoading(false);
        }
      };
      login();
    }
  }, [trigger, userData]);

  return { isLoading, error, token, userInfo };
}
