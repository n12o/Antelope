import Head from '../components/Head';
import Layout from '../components/Layout';
import Wallet from '../components/Wallet';

const indexPage = () => {
  return (
    <div lang='en'>
      <Head
        title={'Home Page'}
        desc={'this is my website for testing nextjs'}
      />
      <Layout>
        <Wallet />
      </Layout>
    </div>
  );
};

export default indexPage;
