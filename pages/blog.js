import React, { useEffect, useState } from 'react'
import styles from '../styles/Blog.module.css'
import Link from 'next/link'
import * as fs from 'fs'
import InfiniteScroll from 'react-infinite-scroll-component';

//step 1:collect all file from blogdara directory
// step2: iterate athrough them and display
const Blog = (props) => {
    const [blogs, setBlogs] = useState(props.allBlogs);
    const [count, setCount] = useState(2);
    console.log(props);
    // useEffect(() => {
    //     console.log("use Effect is running");
    // },[])
    const fetchData = async () => {
        let d = await fetch(`http://localhost:3000/api/blogs/?count=${count + 2}`);
        setCount(count + 2);
        let data = await d.json();
        setBlogs(data);

        // if (this.state.items.length >= 500) {
        //     this.setState({ hasMore: false });
        //     return;
        // }
        // // a fake async api call like which sends
        // 20 more records in .5 secs
        // setTimeout(() => {
        //     this.setState({
        //         items: this.state.items.concat(Array.from({ length: 20 }))
        //     });
        // }, 500);
    };

    return <div className={styles.container}>
        <main className={styles.main}>
            <div className={styles.blog}>
                {/* <h2>Popular Blogs</h2> */}
                <InfiniteScroll
                    dataLength={blogs.length} //This is important field to render the next data
                    next={fetchData}
                    hasMore={props.allcount !== blogs.length}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }

                // below props only if you need pull down functionality
                // refreshFunction={this.refresh}
                // pullDownToRefresh
                // pullDownToRefreshThreshold={50}
                // pullDownToRefreshContent={
                //     <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                // }
                // releaseToRefreshContent={
                //     <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                // }
                >
                    {
                        blogs.map((blogItem) => {
                            return <div key={blogItem.slug} className={styles.blogItem}>
                                <Link href={`./blogpost/${blogItem.slug}`}>
                                    <h2 className={styles.blogItemh2}>{blogItem.title}</h2>
                                </Link>
                                <p className={styles.blogItemp}>{blogItem.metadesc}</p>
                                <Link href={`./blogpost/${blogItem.slug}`}><button className={styles.btn}>Read more</button></Link>

                            </div>
                        })
                    }
                </InfiniteScroll>
                {/* {
                    blogs.map((blogItem) => {
                        return <div key={blogItem.title} className={styles.blogItem}>
                            <Link href={`./blogpost/${blogItem.slug}`}>
                                <h2 className={styles.blogItemh2}>{blogItem.title}</h2>
                            </Link>
                            <p className={styles.blogItemp}>{blogItem.metadesc}</p>
                            <Link href={`./blogpost/${blogItem.slug}`}><button className={styles.btn}>Read more</button></Link>

                        </div>
                    })
                } */}
            </div>
        </main>
    </div>
}
export async function getStaticProps(context) {

    let data = await fs.promises.readdir("blogdata")
    // res.status(200).json(data);
    let myFile;
    let allBlogs = [];
    let allcount = data.length;
    for (let index = 0; index < 2; index++) {
        const item = data[index];
        console.log(item);
        myFile = await fs.promises.readFile(('blogdata/' + item), 'utf-8')
        console.log(myFile);
        allBlogs.push(JSON.parse(myFile));
    }

    return {
        props: { allBlogs, allcount }
    }
}
// export async function getServerSideProps(context){

//     let data=await fetch('http://localhost:3000/api/blogs')
//     let allBlogs=await data.json();

//     return{
//         props: {allBlogs}
//     }
// }
export default Blog  
