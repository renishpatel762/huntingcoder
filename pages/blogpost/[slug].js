import styles from '../../styles/BlogPost.module.css'
import React, { useEffect, useState } from 'react'
import * as fs from 'fs';

// step1:find file corresponding to the slug
// step2: populate the data
const Slug = (props) => {
    function createMarkup(c) {
        return { __html: c };
    }
    const [blog, setBlog] = useState(props.myBlog);
    // const router = useRouter();
    // const { slug } = router.query;

    // useEffect(() => {
    //     if(!router.isReady) return; 
    // },[router.isReady])

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>{blog && blog.title}</h1>

                {blog && <div dangerouslySetInnerHTML={createMarkup(blog.content)}></div>}
            </main>
        </div>
    )
}
export async function getStaticPaths() {
    return {
        paths: [
            { params: { slug: 'how-to-learn-nodejs' } },
            { params: { slug: 'how-to-learn-javascript' } },
            { params: { slug: 'how-to-learn-nextjs' } }
        ],
        fallback: true //false or 'blocking'
    };
}

export async function getStaticProps(context) {
    //roter not work here
    const { slug } = context.params;

    let myBlog = await fs.promises.readFile(`blogdata/${slug}.json`, 'utf-8');

    return {
        props: { myBlog: JSON.parse(myBlog) },
    }

}
// export async function getServerSideProps(context) {
//     //roter not work here
//     const {slug} =context.query;

//     let data=await fetch(`http://localhost:3000/api/getblog?slug=${slug}`)
//     let myBlog=await data.json();
//     return{
//         props:{myBlog}
//     }

// }
export default Slug;