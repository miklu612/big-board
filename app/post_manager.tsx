
import {PostData, getPosts, getPostById} from "./db_connector.tsx";

export async function renderPost(post: PostData) {
  return (
    <div className="post-container">
      <hr/>
      <h2>{post.title}</h2>
      <p> Post ID: {post.id} </p>
      <p> {post.content} </p>
    </div>
  );
}

export async function getSpecificPost(post_id: number): FunctionComponent {
  const post = await getPostById(post_id);
  const element = await renderPost(post);
  return element;
}

export async function getBoardPosts(): FunctionComponent[] {

  console.log(require("./globals.css"));
  const post_data_list: PostData[] = await getPosts();
  const posts: FunctionComponent[] = [];

  
  for(const post of post_data_list) {
    posts.push(renderPost(post));
  }

  return posts;

}
