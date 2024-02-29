import Post from "../Post";
import { useEffect } from "react";

export default function IndexPage() {
  //then used in async
  useEffect(() => {
    fetch("/post").then((response) => {
      response.json((posts) => {
        response.json();
        console.log(posts);
      });
    });
  });
  return (
    <div>
      <Post />
      <Post />
      <Post />
    </div>
  );
}
