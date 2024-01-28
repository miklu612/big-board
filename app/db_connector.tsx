
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

const ERROR_POST: PostData = {
  title: "ERROR POST",
  content: "This post couldn't be loaded properly",
  id: 0
};

type PostData = {title: string, content: string, id: number};
export async function getPosts(): PostData[] {


  const con = await pool.getConnection();
  await con.query("USE big_board");

  // This sql statement was taken from https://stackoverflow.com/questions/12125904/select-last-n-rows-from-mysql/12125925#12125925
  const rows = await con.query("SELECT * FROM (SELECT * FROM posts ORDER BY id DESC LIMIT 10) AS sub ORDER BY id ASC;");
  con.end();

  const posts: PostData[] = [];

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

export async function getPostById(post_id: number): PostData {

  const con = await pool.getConnection();
  await con.query("USE big_board");

  // TODO: SQL-INJECTION PROOF THIS.
  // TODO: SQL-INJECTION PROOF THIS.
  // TODO: SQL-INJECTION PROOF THIS.
  // TODO: SQL-INJECTION PROOF THIS.
  // TODO: SQL-INJECTION PROOF THIS.
  // TODO: SQL-INJECTION PROOF THIS.
  const row = await con.query(`SELECT * FROM posts WHERE id=${post_id}`);

  con.close();

  const post_data: PostData = {
    id: row[0].id,
    title: row[0].title,
    content: row[0].content,
  };

  return post_data;

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
