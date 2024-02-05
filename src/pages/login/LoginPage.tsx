import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../api/useApi";
import { User } from "../../hooks/useUser";
import useAuth from "../../hooks/useAuth";

// interface LoginResponseData {
//   token: string;
//   user: User;
// }

export default function LoginPage(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const { isLoading, error, data, fetchData } = useApi<User>({
    url: "/user/login/",
    method: "post",
    data: {
      email,
      password,
    },
  });

  useEffect(() => {
    if (data) {
      login(data);
      navigate("/profile");
    }
  }, [data]);

  const onLoginFunc = () => {
    console.log("Logging in...");
    fetchData();
  };

  return (
    <div>
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && <div>Logged in!</div>}
      {data && <div>{JSON.stringify(data)}</div>}

      <button onClick={onLoginFunc}>Login</button>
    </div>
  );
}
