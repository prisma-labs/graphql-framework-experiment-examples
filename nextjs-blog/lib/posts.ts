// import * as db from "../db/post";

// export async function getSortedPosts() {
//   return db.getSortedPosts();
// }

// export async function getAllPostIds() {
//   const data = await db.getSortedPosts();
//   return data.map((post) => {
//     return {
//       params: {
//         id: post.id,
//       },
//     };
//   });
// }

// export async function getPostData(id) {
//   const data = await db.getSortedPosts();
//   return data.find((post) => post.id === id)!;
// }
