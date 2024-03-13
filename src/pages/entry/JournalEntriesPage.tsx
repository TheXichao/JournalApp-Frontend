import useApi from "../../api/useApi";
import useUserContext from "../../hooks/useUserContext";
import { useEffect, useState } from "react";
import { sortEntriesByDate } from "./sortEntries";
import { set } from "react-hook-form";

export interface Entry {
  entry_id: number;
  title: string;
  content: string;
  creation_date: string;
}

export default function JournalEntriesPage() {
  const { user } = useUserContext();
  const myToken = user?.authToken;
  const [sortOrder, setSortOrder] = useState("desc");
  const [entries, setEntries] = useState<Entry[] | null>(null);

  // defining how to fetch data from my API and the format to put it in
  const { isLoading, error, data, fetchData } = useApi<Entry[]>({
    url: "/entry/getEntries/",
    method: "get",
    headers: {
      Authorization: `Token ${myToken}`,
    },
  });
  console.log("user", user);

  if (user === null || user === undefined) {
    return (
      <>
        <div>Not logged in</div>
      </>
    );
  }

  function updateEntries() {
    fetchData();
    localStorage.setItem("journalEntries", JSON.stringify(data));
  }

  // check local storage to see if we already have journal data:
  useEffect(() => {
    const localData = localStorage.getItem("journalEntries");
    if (localData) {
      setEntries(JSON.parse(localData));
    } else {
      setEntries(data);
    }
  }, [data]);
  // if we have journal data in local storage, use that, otherwise use the data from the API
  if (entries === null) {
    return (
      <>
        <div>No entries found</div>
        <button onClick={updateEntries}>Update Entries</button>
      </>
    );
  } else {
    return (
      <>
        <h1>Journal Entries</h1>
        <div>
          <h2>Sort by Date</h2>
          <button onClick={() => setSortOrder("desc")}>Desending</button>
          <button onClick={() => setSortOrder("asc")}>Ascending</button>
        </div>
        <ul>
          {sortEntriesByDate(entries, sortOrder).map((post) => (
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
        <button onClick={updateEntries}>Update Entries</button>
        {error && <div>Error: {error.message}</div>}
        {isLoading && <div>Loading...</div>}
      </>
    );
  }
}

{
  /* <ul>
{sortedData?.map((post) => (
  <li key={post.entry_id}>
    <h2>{post.title}</h2>
    <p>
      date: {post.creation_date}
      <br />
      {post.content}
    </p>
  </li>
))}
</ul> */
}
