
// NEXT 
import Image from 'next/image';

// THIRD PARTY
import ReactMarkdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';

import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

// On sélectionne les langages que l'on souhaite highlight
SyntaxHighlighter.registerLanguage('js', js)
SyntaxHighlighter.registerLanguage('css', css)

// OWN
import PostHeader from './post-header';

// CSS 
import classes from './post-content.module.css'



function PostContent(props) {
    const { post } = props;
    const customRenderers = {
        paragraph(paragraph) {
            const { node } = paragraph;
            if (node.children[0].type === 'image') {
                const image = node.children[0];

                return (<div className={classes.image}>
                    <Image
                        src={`/images/posts/${image.url}`}
                        alt={image.alt}
                        width={600}
                        height={300} />
                </div>)
            }

            return <p>{paragraph.children}</p>
        },
        code(code) {
            const { language, value } = code;
            return <SyntaxHighlighter
                style={atomDark}
                // eslint-disable-next-line react/no-children-prop
                children={value}
                language={language}
            />
        }
    };

    const imagePath = `/images/posts/${post.image}`;
    return <article className={classes.content}>
        <PostHeader title={post.title} image={imagePath} />
        <ReactMarkdown
            renderers={customRenderers}
        >{post.content}</ReactMarkdown>

    </article>
}
export default PostContent;