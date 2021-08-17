// OWN
import PostItem from './post-item';

// CSS
import classes from './post-grid.module.css';

function PostsGrid(props) {
    const { posts } = props;
    return <ul className={classes.grid}>
        {posts.map(post => <PostItem key={post.slug} post={post} />)}
    </ul>
}
export default PostsGrid;