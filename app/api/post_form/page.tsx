
import { createPost } from "./../../db_connector.tsx"
import { redirect } from "next/navigation"
import { ErrorPage } from "/components/error_page.tsx"

async function sendPostData(title: string, content: string): boolean {

  // I know the max is longer, but I will stay causious for now and make the
  // max length larger later on.
  if(title.length > 100) {
    return false;
  }

  createPost(title, content);

  return true;

}

export default function handler(req) {

  if(req.searchParams.title === undefined) {
    return (
      <ErrorPage
        message="Could not create post"
        reason="Post title was not provided"
      />
    )
  }
  else if(req.searchParams.content === undefined) {
    return (
      <ErrorPage
        message="Could not create post"
        reason="Post content was not provided"
      />
    )
  }

  sendPostData(req.searchParams.title, req.searchParams.content);


  redirect("/");

}
