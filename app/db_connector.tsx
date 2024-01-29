
import "dotenv/config"

const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "localhost",
  user: process.env.MARIADB_USER_NAME,
  password: process.env.MARIADB_PASSWORD,
  connectionLimit: 5
});

type PostData = {title: string, content: string, id: number};


// This function will get the 10 most recent post and return them in a list of
// `PostData`.
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

// This function will return the next available id number
async function getNextId(): number {

  const con = await pool.getConnection();
  await con.query("USE big_board");

  const rows = await con.query("SELECT Max(id) FROM posts");
  con.end();

  const max_id: number = rows[0]["Max(id)"] + 1;

  return max_id;

}

// This function will return the post identified by its id. Throws an error if
// the post isn't found.
export async function getPostById(post_id: number): PostData {

  const con = await pool.getConnection();
  await con.query("USE big_board");

  const row = await con.query(`SELECT * FROM posts WHERE id=?`, [post_id]);

  con.end();

  if(row.length <= 0) {
    throw "Couldn't find post";
  }

  const post_data: PostData = {
    id: row[0].id,
    title: row[0].title,
    content: row[0].content,
  };

  return post_data;

}

// Creates a post and sends it to the database. 
export async function createPost(title: string, content: string): string {

  const post_id: number = await getNextId();
  const con = await pool.getConnection();
  await con.query("USE big_board");

  await con.query("INSERT INTO posts VALUES (?, ?, ?)", [post_id, title, content]);
  con.end();

}
