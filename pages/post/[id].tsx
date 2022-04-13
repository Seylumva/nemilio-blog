import { PortableText } from "@portabletext/react";
import Image from "next/image";
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

export default function Post({ post }: any) {
  return (
    <div className={styles.post}>
      <div className={styles.image}>
        <Image src={post.mainImage.asset.url} layout="fill" objectFit="cover" />
      </div>
      <div className={styles["post-text"]}>
        <h2>{post.title}</h2>
        <PortableText value={post.body} components={portableTextComponents} />
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }: any) {
  const post = await Sanity.fetch(`*[_type == "post" && _id == "${params.id}"]{
    _id,
    title,
    body,
    author -> {
  name,
  image{asset -> {
  url
}}
},
    mainImage{asset -> {
      url
    }}
  }`);
  return {
    props: {
      post: post[0],
    },
  };
}
