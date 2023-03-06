import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import styles from "../../styles/post.module.css"


interface Post {
    title : string,
    content : string
}

interface Props{
    post : Post,
    title : string
}

interface Slug {
    slug : string
}

 const Post : React.FC<Props> = (props) => {
  const router = useRouter()
  return (
    <>
      <p>
        <Link href="/social">
          <small>&laquo; back to all blog posts</small>
        </Link>
      </p>
      <h2 className={styles.title}>{props.post.title}</h2>
      <p>{props.post.content}</p>
      <button onClick={() => router.push("/social")}>
        Click me to programmatically navigate or redirect
      </button>
    </>
  )
}

export async function getStaticPaths() {
  const response = await fetch("https://learnwebcode.github.io/json-example/posts.json")
  const data = await response.json()

  const thePaths = data.posts.map((pet: Slug) => {
    return { params: { slug: pet.slug } }
  })

  return {
    paths: thePaths,
    fallback: false
  }
}

export async function getStaticProps(context : any) {
  const response = await fetch("https://learnwebcode.github.io/json-example/posts.json")
  const data = await response.json()
  const thePost = data.posts.filter((post: Slug) => post.slug === context.params.slug)[0]

  return {
    props: {
      post: thePost,
      title: thePost.title
    }
  }
}

export default Post