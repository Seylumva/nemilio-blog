import { formatDistanceToNowStrict } from "date-fns";
import { urlFor } from "../sanityClient";
import Image from "next/image";
import Link from "next/link";
import styles from "./PostList.module.css";

export default function PostList({ posts }: any) {
  return (
    <ul className={styles["post-list"]}>
      {posts.map((post: any) => (
        <Link key={post._id} href={`/post/${post._id}`}>
          <a className={styles.post}>
            <div className={styles["post-image"]}>
              <Image
                src={urlFor(post.mainImage).url()}
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h3>{post.title}</h3>
            <div className={styles.info}>
              <div>
                <p>by {post.author.name}</p>
                <span>
                  Posted{" "}
                  {formatDistanceToNowStrict(new Date(post.publishedAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <img src={post.author.image.asset.url} alt="" />
            </div>
          </a>
        </Link>
      ))}
    </ul>
  );
}
