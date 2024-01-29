
import { FunctionComponent } from "react";

export function ErrorPage({message, reason}): FunctionComponent {
  return (
    <div>
      <h1> {message} </h1>
      <p> Reason: {reason} </p>
      <a href="/"> Go back to main page </a>
    </div>
  )
}

