import Head from '../components/Head';
import Layout from '../components/Layout';
import Operation from '../components/Operation';

const operationPage = () => {
  return (
    <div lang='en'>
      <Head
        title={'Home Page'}
        desc={'this is my website for testing nextjs'}
      />
      <Layout>
        <Operation />
      </Layout>
    </div>
  );
};

export default operationPage;
