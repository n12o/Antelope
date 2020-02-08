import Head from '../components/Head';
import Layout from '../components/Layout';

const indexPage = () => {
  return (
    <div lang='en'>
      <Head
        title={'Home Page'}
        desc={'this is my website for testing nextjs'}
      />
      <Layout>
        <h1>Hello World!</h1>
      </Layout>
    </div>
  );
};

export default indexPage;
