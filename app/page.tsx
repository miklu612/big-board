// import Image from "next/image";

// TODO: Figure a way to create a db with scripts for new instances

/*
DB SCHEMA:
 | id      | title     | content |
   char255   char255     text
*/

const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "localhost",
  user: "bigboard",
  password: "password123",
  connectionLimit: 5
});

class Post {

  title: string = ""
  content: string = ""

  constructor(title, content) {
    this.title = title;
    this.content = content;
  }

}

type PostData = {title: string, content: string;}
async function getPost(): PostData {

  const ERROR_POST: PostData = {
    title: "ERROR POST",
    content: "This post couldn't be loaded properly"
  };

  let con = await pool.getConnection();
  await con.query("USE big_board");
  const rows = await con.query("SELECT * FROM posts WHERE id='0'");


  if(rows.length === 0) {
    return {
      title: "Post not found",
      content: ""
    };
  }
  else {
    return {
      title: rows[0].title,
      content: rows[0].content,
    };
  }

}

async function BoardPost(title: string, content: string) {
  const post_data: PostData = await getPost();
  return (
    <div>
      <h2> {post_data.title} </h2>
      <p> {post_data.content} </p>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <h1> Big Board </h1>
      <p> Big Board is simple bulletin board application made with Next.Js </p>
      {BoardPost("Hello, World!", "Hello, World. This is a test post")}
    </main>
  );
}
