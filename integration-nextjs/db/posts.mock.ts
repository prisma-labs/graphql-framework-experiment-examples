export type Post = {
  date: string;
  content: string;
  id: string;
  title: string;
};

export function getSortedPosts(): Promise<Post[]> {
  return Promise.resolve([
    {
      content:
        "Me: Dear World, teach me how APIs access private static files in NextJS.\n\nWorld: Read this young one: https://github.com/zeit/next.js/issues/8251.",
      date: "2020-01-13",
      id: "1",
      title: "Hello world",
    },
  ]);
}
