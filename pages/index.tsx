import Head from "next/head";
import Sanity from "../sanityClient";
import PostList from "../components/PostList";

const Home = ({ developerLogs, tipsAndTricks }: any) => {
  return (
    <div>
      <Head>
        <title>nemil.io Blog</title>
        <meta
          name="description"
          content="Front end development blog posts by Emilio Noa. From tips and tricks to developer logs, you can always find something new to read."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostList posts={tipsAndTricks} title="Tips &amp; Tricks" />
      <PostList posts={developerLogs} title="Developer logs" />
    </div>
  );
};

export async function getServerSideProps() {
  const developerLogs =
    await Sanity.fetch(`*[_type == "post" && "Developer Log" in categories[]->title] | order(_createdAt desc) {
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
  const tipsAndTricks =
    await Sanity.fetch(`*[_type == "post" && "Tips & Tricks" in categories[]->title] | order(_createdAt desc) {
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
  return {
    props: { developerLogs, tipsAndTricks },
  };
}

export default Home;
