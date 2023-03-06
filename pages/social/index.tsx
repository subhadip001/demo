import Link from 'next/link'
import React, { useState } from 'react'

interface Posts {
    title: string,
    slug: string,
    content: string
}

type Props = {
    posts: Posts[],
    skyColor: string
}

const social: React.FC<Props> = (props) => {
    const [count, setCount] = useState<number>(0)
    const handleChange = () => {
        setCount(count => count + 1)
    }
    return (
        <>
            <h1>Count : {count}</h1>
            <button type='button' onClick={handleChange}>Increase</button>

            <h1>{props.skyColor}</h1>

            {props.posts.map((data) => {
                return (
                    <>
                        <Link href={`/blog/${data.slug}`}><h1> {data.title}</h1></Link>
                        <p>{data.content}</p>
                    </>
                )
            })}
            <Link href="/"><button>Home</button></Link>
        </>
    )
}

export async function getStaticProps() {
    const res = await fetch("https://learnwebcode.github.io/json-example/posts.json")
    const data = await res.json()

    return (
        {
            props: {
                posts: data.posts,
                skyColor: "blue",
                isOk: true
            }
        }
    )

}

export default social