
import { getSpecificPost } from "./../post_manager.tsx";
import { ErrorPage } from "/components/error_page.tsx";




export default async function page(req) {


  const search_params = req.searchParams;

  if(search_params.post_id === undefined) {
    return (
      <ErrorPage 
        message="Failed to find post"
        reason="Post id not defined" 
      />
    )
  }

  const post_id: number = Number(search_params.post_id);

  if(isNaN(post_id)) {
    return (
      <ErrorPage
        reason = "Invalid post id"
      />
    )
  }

  try {
    const post = await getSpecificPost(post_id);
    return (
      <div>
        <h1> Big Board </h1>
        <a href="/"> Back to main page </a>
        {post}
      </div>
    );
  }
  catch(e) {
    return (
      <ErrorPage
        message="Failed to find post"
        reason = "Couldn't get post"
      />
    );
  }
  

}

