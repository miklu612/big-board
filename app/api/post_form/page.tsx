
const {createPost} = require("./../../db_connector.tsx");

async function sendPostData(title: string, content: string): boolean {

  // I know the max is longer, but I will stay causious for now and make the
  // max length larger later on.
  if(title.length > 100) {
    return false;
  }

  createPost(title, content);



  return true;

}

export default function handler(req, res) {
  //console.log(req.searchParams);

  if(req.searchParams.title === undefined) {
    return <h1> Error </h1>;
  }
  else if(req.searchParams.content === undefined) {
    return <h1> Error </h1>;
  }

  sendPostData(req.searchParams.title, req.searchParams.content);


  return <h1> Post created </h1>;

}
