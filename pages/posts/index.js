// REACT
import { Fragment } from 'react';

// NEXT 
import Head from 'next/head';

// OWN
import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../helpers/post-utils';

function AllPostsPage(props) {
    return <Fragment>
        <Head>
            <title>Tout les articles</title>
            <meta name="description" content="La liste de tout mes articles" />
        </Head>
        <AllPosts posts={props.posts} />
    </Fragment>

}

export function getStaticProps() {
    const allPosts = getAllPosts();
    return {
        props: {
            posts: allPosts
        },
        revalidate: 36000
    }
}
export default AllPostsPage;