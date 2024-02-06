import useApi from "../api/useApi";
import useUserContext from "../hooks/useUserContext";
import { Navigate } from "react-router-dom";

interface Entry {
  entry_id: number;
  title: string;
  content: string;
  date: string;
}

// piece of code used to test wether my token is being passed to the backend
// interface message {
//   message: string;
// }

export default function JournalEntriesPage() {
  const { user } = useUserContext();
  console.log("user", user);

  const myToken = user?.authToken;
  const { isLoading, error, data, fetchData } = useApi<Entry[]>({
    url: "/entry/sample/",
    method: "get",
    headers: {
      Authorization: `Token ${myToken}`,
    },
  });
  return (
    <div>
      <h1>Fetched Posts</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      <ul>
        {data?.map((post) => (
          <li key={post.entry_id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>{post.date}</p>
          </li>
        ))}
      </ul>

      <button onClick={fetchData}>Get Entries</button>
    </div>
  );
}
