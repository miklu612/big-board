
export default function Home() {
  return (
    <main>
      <h1> Big Board Post Page </h1>
      <p> Big Board is simple bulletin board application made with Next.Js </p>
      <form action="/api/post_form">
        <input name="title" placeholder="Title" autocomplete="off"/>
        <textarea name="content" placeholder="Content"></textarea>
        <button type="submit"> Submit </button>
      </form>
    </main>
  );
}

