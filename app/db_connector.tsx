
// TODO: SQL-INJECTION PROOF THIS.
// TODO: SQL-INJECTION PROOF THIS.
// TODO: SQL-INJECTION PROOF THIS.
// TODO: SQL-INJECTION PROOF THIS.
// TODO: SQL-INJECTION PROOF THIS.
// TODO: SQL-INJECTION PROOF THIS.

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
export async function getPosts(): PostData[] {

  const ERROR_POST: PostData = {
    title: "ERROR POST",
    content: "This post couldn't be loaded properly"
  };

  let con = await pool.getConnection();
  await con.query("USE big_board");
  const rows = await con.query("SELECT * FROM posts LIMIT 10");
  con.end();


  console.log(rows);
  let posts: PostData[] = [];

  for(const post_data of rows) {
    console.log(post_data);

    if(post_data.id === undefined) { continue; }
    if(post_data.title === undefined) { continue; }
    if(post_data.content === undefined) { continue; }

    posts.push({
      title: post_data.title,
      content: post_data.content
    });

  }

  return posts;


}

async function getNextId(): number {

  const con = await pool.getConnection();
  await con.query("USE big_board");

  const rows = await con.query("SELECT Max(id) FROM posts");
  con.end();

  const max_id: int = rows[0]["Max(id)"] + 1;

  return max_id;

}

export async function createPost(title: string, content: string): string {

  const post_id: number = await getNextId();
  const con = await pool.getConnection();
  await con.query("USE big_board");

  // TODO: SQL-INJECTION PROOF THIS.
  // TODO: SQL-INJECTION PROOF THIS.
  // TODO: SQL-INJECTION PROOF THIS.
  // TODO: SQL-INJECTION PROOF THIS.
  // TODO: SQL-INJECTION PROOF THIS.
  // TODO: SQL-INJECTION PROOF THIS.
  await con.query(`INSERT INTO posts VALUES (${post_id}, '${title}', "${content}")`);
  con.end();

}
