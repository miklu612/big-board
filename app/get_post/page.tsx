
import {getSpecificPost} from "./../post_manager.tsx";



function ErrorPage({reason}): functionComponent {
  return (
    <div>
      <h1> Failed to find post</h1>
      <p> Reason: {reason} </p>
    </div>
  )
}

export default function page(req, res) {


  const search_params = req.searchParams;

  if(search_params.post_id === undefined) {
    return (
      <ErrorPage 
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

  return (
    <div>
      <h1> Big Board </h1>
      <a href="/"> Back to main page </a>
      {getSpecificPost(post_id)}
    </div>
  );
}

