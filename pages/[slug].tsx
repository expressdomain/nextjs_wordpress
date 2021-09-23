import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PostBody from '../components/post/post-body'
import PostHeader from '../components/post/post-header'
import Layout from '../components/layouts/layout'
import { getPage } from '../lib/api'
import { PAGES } from '../lib/constants';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useState } from 'react';

const Post = ({ page }) => {
  const router = useRouter();
  
  const [timerId, setTimerId] = useState(null);
  const debounce = (fn, bufferInterval = 3000) => {
    return () => {
      clearTimeout(timerId);
      const timer = setTimeout(() => {
        fn();
      }, bufferInterval);
      setTimerId(timer);
    };
  };
  const handleWord = (newWord) => {
    debounce(() => {
      router.replace(`/?word=${newWord}`, undefined, {shallow: true});
    }, 500)();
  };

  if (!router.isFallback && !page?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout
      title={page.title}
      description={page.content}
      setWord={handleWord}
    >
      <div className="px-8 mx-auto sm:px-10 sm:max-w-screen-md md:max-w-3xl lg:max-w-3xl">
        {router.isFallback
          ? <>Loading…</>
          : (
            <div className="px-5 my-10">
              <PostHeader
                title={page.title}
                date={page.date}
                author={page.author?.node}
              />
              <PostBody content={page.content} />
            </div>
          )}
      </div>
    </Layout>
  );
}

export default Post;

export const getStaticProps: GetStaticProps = async (context) => {
  const data: any = await getPage(context.params.slug);
  return {
    props: {
      page: data.pageBy,
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: PAGES.map((page) => `/${page.url}`) || [],
    fallback: false,
  }
}
