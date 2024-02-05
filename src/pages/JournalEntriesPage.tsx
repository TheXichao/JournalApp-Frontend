import { useGetPostsAPI } from "../hooks/useFetchData";

export default function JournalEntriesPage() {
  const { isLoading, error, posts } = useGetPostsAPI({
    path: "/entry/sample/",
    token: "faaf19de8f64971891ef0a6e38202df909990dc4",
  });
  if (error) {
    return <div>Something went wrong</div>;
  }
  return (
    <div>
      <h1>Fetched Posts</h1>

      {/* special syntax for conditional rendering */}
      {isLoading && <div>Loading...</div>}
      {!isLoading && posts.length === 0 && <div>No posts found</div>}

      <ol>
        {/* using the map to take each item of Post inside Posts[] and display properties of a certain post object */}
        {posts.map((post) => {
          console.log(post);
          return <li key={post.entry_id}>{post.title}</li>;
        })}
      </ol>
    </div>
  );
}
