import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.css";

export default function Post({ posts }) {
  return (
    <Layout>
      <Head>
        <title>{posts.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{posts.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={posts.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: posts.content }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = await getPostData(params.id);
  return {
    props: {
      posts,
    },
  };
};
