import React, { useEffect, useState } from "react";
import useApi from "../../api/useAPI";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { set } from "react-hook-form";

interface User {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
}
interface RegisterResponseData {
  token: string;
  user: User;
}
interface registerRequestData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export default function RegisterPage(): JSX.Element {
  // my states
  const [registerRequestData, setregisterRequestData] =
    useState<registerRequestData>({} as registerRequestData);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const { isLoading, error, data, fetchData } = useApi<RegisterResponseData>({
    url: "/user/register/",
    method: "post",
    data: {
      email: registerRequestData.email,
      password: registerRequestData.password,
      first_name: registerRequestData.first_name,
      last_name: registerRequestData.last_name,
    },
  });

  useEffect(() => {
    if (data) {
      cookies.set("token", data.token, { path: "/" });
      cookies.set("userInfo", JSON.stringify(data.user), { path: "/" });

      // redirect to profile page
      navigate("/profile");
    }
  }, [data]);
  const onRegisterFunc = () => {
    console.log("Registering...");
    fetchData(); // triggers myApiCall
  };
  return (
    <div>
      <input
        placeholder="email"
        value={registerRequestData.email}
        onChange={(e) =>
          setregisterRequestData({
            ...registerRequestData,
            email: e.target.value,
          })
        }
      />
      <input
        type="password"
        placeholder="password"
        value={registerRequestData.password}
        onChange={(e) =>
          setregisterRequestData({
            ...registerRequestData,
            password: e.target.value,
          })
        }
      />
      <input
        placeholder="first name"
        value={registerRequestData.first_name}
        onChange={(e) =>
          setregisterRequestData({
            ...registerRequestData,
            first_name: e.target.value,
          })
        }
      />
      <input
        placeholder="last name"
        value={registerRequestData.last_name}
        onChange={(e) =>
          setregisterRequestData({
            ...registerRequestData,
            last_name: e.target.value,
          })
        }
      />
      {isLoading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
      {data && <div>Token: {data.token}</div>}
      {data && <div>User info: {JSON.stringify(data.user)}</div>}
      <br />

      <input
        disabled={isLoading}
        type="button"
        value="Register"
        onClick={onRegisterFunc}
      />
    </div>
  );
}
