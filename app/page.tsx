// import Image from "next/image";

// TODO: Figure a way to create a db with scripts for new instances

/*
DB SCHEMA:
 name: big_board

 USE posts:
  | id      | title     | content |
    char255   char255     int
*/

const {PostData, getPosts} = require("./db_connector.tsx");
const {FunctionComponent} = require("react");

async function BoardPost(title: string, content: string): FunctionComponent[] {

  const post_data_list: PostData[] = await getPosts();
  let posts: FunctionComponent[] = [];
  
  for(const post of post_data_list) {
    posts.push((
      <div>
        <h2>{post.title}</h2>
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
      <p> Big Board is simple bulletin board application made with Next.Js </p>
      <a href="/post"> Create a post </a>
      {BoardPost("Hello, World!", "Hello, World. This is a test post")}
    </main>
  );
}
