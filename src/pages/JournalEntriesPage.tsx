import useUser from "../hooks/useUser";
import useApi from "../api/useApi";

interface Entry {
  entry_id: number;
  title: string;
  content: string;
  date: string;
}

export default function JournalEntriesPage() {
  const { getUser } = useUser();
  const myUser = getUser();

  const myToken = myUser?.authToken;
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

      <button onClick={fetchData}>Get Posts</button>
    </div>
  );
}
