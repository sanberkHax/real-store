import Head from 'next/head';

export const Meta = (props) => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.desc} />
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={props.title} />
      <meta
        name="og:description"
        property="og:description"
        content={props.desc}
      />
      <meta property="og:site_name" content="Real Store" />
      <meta property="og:url" content={props.canonical} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.desc} />
      <meta name="twitter:creator" content="@sanberkDev" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="canonical" href={props.canonical} />
    </Head>
  );
};
