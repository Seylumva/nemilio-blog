import { PortableText } from "@portabletext/react";
import { formatDistanceToNowStrict } from "date-fns";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import PostList from "../../components/PostList";
import Sanity, { urlFor } from "../../sanityClient";
import styles from "./Post.module.css";

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className={styles["post-image"]}>
        <Image src={urlFor(value).url()} layout="fill" objectFit="contain" />
      </div>
    ),
  },
};

export default function Post({ post, otherPostsByAuthor }: any) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <div className={styles.main}>
        <div className={styles.image}>
          <Image
            src={post.mainImage.asset.url}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className={styles["post-text"]}>
          <h2>{post.title}</h2>
          <PortableText value={post.body} components={portableTextComponents} />
        </div>
      </div>
      <aside>
        <h2>More by this author</h2>
        <PostList posts={otherPostsByAuthor} />
      </aside>
    </>
  );
}

export async function getServerSideProps({ params }: any) {
  const post = await Sanity.fetch(`*[_type == "post" && _id == "${params.id}"]{
    ...,
    author -> {
      name,
      image { asset -> {
          url
        }
      }
    },
    mainImage {asset -> {
      url
      }
    }
  }`);

  const otherPostsByAuthor = await Sanity.fetch(
    `*[_type == "post" && author->_id == "84b01a2c-10f0-4719-8f24-25385262d151" && _id != "${params.id}"][0...4]| order(publishedAt desc) {
      ...,
      author -> {
        name,
        image { asset -> {
            url
          }
        }
      },
      mainImage {asset -> {
        url
        }
      }
    }`
  );
  return {
    props: {
      post: post[0],
      otherPostsByAuthor,
    },
  };
}
