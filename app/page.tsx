

import {getBoardPosts} from "./post_manager.tsx";
import "./globals.css";



export default function Home() {
  return (
    <main>
      <h1> Big Board </h1>
      <p> Big Board is a simple message board. </p>
      <a href="/post"> Create a post </a>
      <br/> 
      <form action="/get_post">
        <input autoComplete="off" name="post_id" placeholder="Post ID" type="text"/>
        <button type="submit"> Get Post </button>
      </form>
      {getBoardPosts()}
    </main>
  );
}
