import fs from "fs";
import matter from "gray-matter";
import path from "path";

export type Post = {
  date: string;
  content: string;
  id: string;
  title: string;
};

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData(): Post[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id: id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      content: matterResult.content,
    } as Post;
  });

  // Sort posts by date
  return allPostsData.sort((a: any, b: any) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
