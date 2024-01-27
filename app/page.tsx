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


async function BoardPost(title: string, content: string): FunctionComponent[] {

  console.log(require("./globals.css"));
  const post_data_list: PostData[] = await getPosts();
  let posts: FunctionComponent[] = [];

  
  for(const post of post_data_list) {
    posts.push((
      <div className="post-container">
        <hr/>
        <h2>{post.title}</h2>
        <p> Post ID: {post.id} </p>
        <p> {post.content} </p>
      </div>
    ));
  }


  return posts;
}

export default function Home() {
  return (
    <main>
      <h1> Big Board </h1>
      <p> Big Board is a simple message board. </p>
      <a href="/post"> Create a post </a>
      {BoardPost("Hello, World!", "Hello, World. This is a test post")}
    </main>
  );
}
