import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getSortedPosts } from "../../db/post";
import utilStyles from "../../styles/utils.module.css";

export default function Post({ post }) {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getSortedPosts();
  const paths = posts.map((post) => {
    return { params: { id: post.id } };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = await getSortedPosts();
  const post = posts.find((post) => post.id === params.id);
  return {
    props: {
      post,
    },
  };
};
