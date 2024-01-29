
import {PostData, getPosts, getPostById} from "./db_connector.tsx";
import Link from "next/link";

export async function renderPost(post: PostData) {


  const mention_regex = /@\d+/g;

  const post_mentions: string[] = post.content.match(mention_regex);
  const mention_tags: FunctionComponent[] = [];
  
  if(post_mentions !== null) {

    const raw_mention_datas: string[] = post_mentions.map((v)=>{
      return v.replace("@", "");
    });

    for(const raw_mention_data of raw_mention_datas) {

      const href_data = {
        pathname: "/get_post/",
        query: {
          post_id: raw_mention_data
        }
      };

      mention_tags.push((
        <Link key={raw_mention_data} className="mention-link" href={href_data}> &gt; {raw_mention_data} </Link>
      ));
    }
  }

  return (
    <div className="post-container">
      <hr/>
      <h2>{post.title}</h2>
      <p> Post ID: {post.id} </p>
      {mention_tags}
      <pre>{post.content}</pre>
    </div>
  );

}

export async function getSpecificPost(post_id: number): FunctionComponent {
  const post = await getPostById(post_id);
  const element = await renderPost(post);
  return element;
}

export async function getBoardPosts(): FunctionComponent[] {

  const post_data_list: PostData[] = await getPosts();
  const posts: FunctionComponent[] = [];

  for(const post of post_data_list) {
    posts.push(renderPost(post));
  }

  return posts;

}
