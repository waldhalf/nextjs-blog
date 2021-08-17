// OWN
import PostGrid from '../posts/posts-grid';
// CSS
import classes from './featured-posts.module.css';

function FeaturedPosts(props) {

    const { posts } = props;

    return <section className={classes.latest}>
        <h2>Featured posts</h2>
        <PostGrid posts={posts} />
    </section>
}

export default FeaturedPosts;