import Head from 'next/head';

export default function PageHead(props) {
  return (
    <Head>
      <title lang='en'>{props.title}</title>
      <meta
        name='description'
        content={props.desc}
      ></meta>
      <link rel='manifest' href='/manifest.json' />
      <meta name='theme-color' content='#72B340' />
      <link rel='apple-touch-icon' href='/icon-192.png' />
    </Head>
  );
};
