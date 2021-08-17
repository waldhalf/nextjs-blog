// NODE
import fs from 'fs';
import path from 'path';

// THIRD PARTY
import matter from 'gray-matter';

const postsDirPath = path.join(process.cwd(), 'data', 'posts');


export function getPostsFiles() {
    return fs.readdirSync(postsDirPath);
}

export function getPostData(postIdentifier) {
    const postSlug = postIdentifier.replace(/\.md$/, '');
    const filePath = path.join(postsDirPath, `${postSlug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const postData = {
        slug: postSlug,
        ...data,
        content: content
    };
    return postData;
}

export function getAllPosts() {
    const postFiles = getPostsFiles();

    const allPosts = postFiles.map(postfile => {
        return getPostData(postfile)
    })
    const sortedPosts = allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1);
    return sortedPosts;
}


export function getFeaturedPosts() {
    const allPosts = getAllPosts();
    const featuredPosts = allPosts.filter(post => post.isFeatured);
    return featuredPosts;
}
