import useApi from "../api/useApi";
import useUserContext from "../hooks/useUserContext";

interface Entry {
  entry_id: number;
  title: string;
  content: string;
  creation_date: string;
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
    url: "/entry/getEntries/",
    method: "get",
    headers: {
      Authorization: `Token ${myToken}`,
    },
  });
  const ids = data?.map((entry) => entry.entry_id);
  console.log("ids", ids);
  return (
    <div>
      <h1>Fetched entries</h1>
      {/* {console.log("error", error)} */}
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}

      <ul>
        {data?.map((post) => (
          <li key={post.entry_id}>
            <h2>{post.title}</h2>
            <p>
              date: {post.creation_date}
              <br />
              {post.content}
            </p>
          </li>
        ))}
      </ul>

      <button onClick={fetchData}>Get Entries</button>
    </div>
  );
}
