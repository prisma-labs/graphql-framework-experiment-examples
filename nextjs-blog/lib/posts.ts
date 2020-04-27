import { request } from "graphql-request";

type Post = {
  date: string;
  content: string;
  id: string;
  title: string;
};

export async function getSortedPosts(): Promise<Post[]> {
  const query = `{
    posts {
      id
      title
      date
      content
    }
  }`;

  const data: { posts: Post[] } = await request(
    "http://localhost:4000/graphql",
    query
  );

  return data.posts.sort((a: any, b: any) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getAllPostIds() {
  const data: { posts: { id: string }[] } = await request(
    "http://localhost:4000/graphql",
    `{
       posts {
         id
       }
     }
    `
  );

  return data.posts.map((post) => {
    return {
      params: {
        id: post.id,
      },
    };
  });
}

export async function getPostData(id): Promise<Post> {
  const operation = `{
    post(id: "${id}") {
      id
      title
      date
      content
    }
  }`;

  const data: { post: Post } = await request(
    "http://localhost:4000/graphql",
    operation
  );

  return data.post;
}
