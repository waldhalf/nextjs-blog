//REACT
import { Fragment } from 'react';

// NEXT 
import Head from 'next/head';

// OWN
import Hero from '../components/home-page/hero';
import FeaturedPosts from '../components/home-page/featured-posts';
import { getFeaturedPosts } from '../helpers/post-utils';


function HomePage(props) {
  const { posts } = props;

  return <Fragment>
    <Head>
      <title>DevFool&apos;s Blog</title>
      <meta name="description" content="Un blog à propos de code" />
    </Head>
    <Hero />
    <FeaturedPosts posts={posts} />
  </Fragment>;
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();
  return {
    props: {
      posts: featuredPosts
    },
    revalidate: 36000
  }

}

export default HomePage;