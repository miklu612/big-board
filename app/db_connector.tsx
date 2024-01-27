
// TODO: SQL-INJECTION PROOF THIS.
// TODO: SQL-INJECTION PROOF THIS.
// TODO: SQL-INJECTION PROOF THIS.
// TODO: SQL-INJECTION PROOF THIS.
// TODO: SQL-INJECTION PROOF THIS.
// TODO: SQL-INJECTION PROOF THIS.

import "dotenv/config"

const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "localhost",
  user: process.env.MARIADB_USER_NAME,
  password: process.env.MARIADB_PASSWORD,
  connectionLimit: 5
});


type PostData = {title: string, content: string, id: number};
export async function getPosts(): PostData[] {

  const ERROR_POST: PostData = {
    title: "ERROR POST",
    content: "This post couldn't be loaded properly"
  };

  let con = await pool.getConnection();
  await con.query("USE big_board");
  const rows = await con.query("SELECT * FROM posts LIMIT 10");
  con.end();

  let posts: PostData[] = [];

  for(const post_data of rows) {

    if(post_data.id === undefined) { continue; }
    if(post_data.title === undefined) { continue; }
    if(post_data.content === undefined) { continue; }

    posts.push({
      title: post_data.title,
      content: post_data.content,
      id: post_data.id
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
