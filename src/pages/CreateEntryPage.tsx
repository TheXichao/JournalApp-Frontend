import { useState, useEffect } from "react";
import useApi from "../api/useApi";
import useUserContext from "../hooks/useUserContext";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface requestFeedback {
  message: string;
}

export default function CreateEntryPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useUserContext();
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const myToken = user?.authToken;

  const { isLoading, error, data, fetchData } = useApi<requestFeedback>({
    url: "/entry/createEntry/",
    method: "POST",
    data: {
      title,
      content,
    },
    headers: {
      Authorization: `Token ${myToken}`,
    },
  });

  const onCreateEntry = () => {
    fetchData();
    console.log("Creating entry...");
    if (data) {
      navigate("/entries");
    }
  };

  return (
    <div>
      <h1>Create Journal Entry</h1>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </div>
      {error && <div>Error: {error.message}</div>}
      {isLoading && <div>Loading...</div>}
      {data && <div>{data.message}</div>}
      <input type="submit" value="Create Entry" onClick={onCreateEntry} />
    </div>
  );
}
