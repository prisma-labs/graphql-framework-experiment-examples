import fs from "fs";
import matter from "gray-matter";
import path from "path";
import remark from "remark";
import html from "remark-html";

export type Post = {
  date: string;
  content: string;
  id: string;
  title: string;
};

const postsDir = path.join(process.cwd(), "db", "data", "posts");

export async function getSortedPosts(): Promise<Post[]> {
  const fileNames = fs.readdirSync(postsDir);

  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(postsDir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      const content = await remark()
        .use(html)
        .process(matterResult.content)
        .then((html) => html.toString());

      // Combine the data with the id
      return {
        id: id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        content: content,
      } as Post;
    })
  );

  // Sort posts by date
  return allPostsData.sort((a: any, b: any) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
