
import "./post.css"
import {FunctionComponent} from "react"

export default function Home(): FunctionComponent {
  return (
    <div className="post-creator-container">
      <h1> Big Board Post Page </h1>
      <p> Big Board is simple bulletin board application made with Next.Js </p>
      <a href="/"> Back to main page </a>
      <br/> 
      <form action="/api/post_form">
        <input name="title" placeholder="Title" autoComplete="off"/>
        <textarea name="content" placeholder="Content"></textarea>
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
}

