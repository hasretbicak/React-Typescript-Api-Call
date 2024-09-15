import "./App.css";
import { useEffect, useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com/";
const POSTS_URL = BASE_URL + "/posts";

interface Post {
  userId: string;
  id: number;
  title: string;
  body: string;
}

async function getPosts(page: number) {
  const response = await fetch(POSTS_URL + "?page=" + page);
  const postsData: Post[] = await response.json();
  return postsData;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [page, setPage] = useState(0);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const postsData = await getPosts(page);
        setPosts(postsData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        console.log(e);
        setError(e);
      }
      setLoading(false);
    })();
  }, [page]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>An error occurred. Try again.</div>;
  }

  function handleNextPage() {
    setPage((oldPage) => oldPage + 1);
  }
  return (
    <>
      <div>
        <h1>React Api Call</h1>
        <div>
          <button onClick={handleNextPage}>Next Page</button>
        </div>
        <ul>
          {posts.map((post) => (
            <li key={post.id} style={{ marginBottom: "20px" }}>
              <div style={{ marginBottom: "10px", fontWeight: 700 }}>
                {post.title}
              </div>
              <div>{post.body}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
