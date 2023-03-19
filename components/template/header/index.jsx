import Head from "next/head";

const Index = ({ title, description }) => {
  return (
    <Head>
      <title>{title || "Chameleon Landing Page"}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Index;
