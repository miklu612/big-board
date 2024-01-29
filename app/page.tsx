// import Image from "next/image";

// TODO: Figure a way to create a db with scripts for new instances

/*
DB SCHEMA:
 name: big_board

 USE posts:
  | id      | title     | content |
    char255   char255     int
*/

import {PostData, getPosts} from "./db_connector.tsx";
import {FunctionComponent} from "react";
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
        <input autoComplete="no" name="post_id" placeholder="Post ID" type="text"/>
        <button type="submit"> Get Post </button>
      </form>
      {getBoardPosts()}
    </main>
  );
}
