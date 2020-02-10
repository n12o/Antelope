import Head from '../../components/Head';
import Layout from '../../components/Layout';
import Log from '../../components/Log';

const LogPage = () => {
  return (
    <>
      <Head
        title={'Home Page'}
        desc={'this is my website for testing nextjs'}
      />
      <Layout>
        <Log />
      </Layout>
    </>
  );
};

export default LogPage;
