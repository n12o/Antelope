import Head from '../components/Head';
import Layout from '../components/Layout';
import Wallet from '../components/Wallet';
import Welcome from '../components/Welcome';
import { useState, useEffect } from 'react';
import localforage from 'localforage';

const IndexPage = () => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWallet();
  }, []);

  const getWallet = () => {
    localforage
      .getItem('wallet')
      .then(wallet => {
        if (!wallet) {
          setLoading(false);
          return;
        }
        setWallet(wallet);
        setLoading(false);
      })
      .catch(err => console.log(err));
  };

  const handleUpload = () => {
    getWallet();
  };

  const handleRemove = () => {
    setWallet(null);
  };

  console.log(wallet);

  let display;

  if (loading) {
    display = '';
  } else if (!wallet) {
    display = <Welcome onUpload={handleUpload} />;
  } else {
    display = <Wallet onRemove={handleRemove} wallet={wallet} />;
  }

  return (
    <>
      <Head
        title={'Home Page'}
        desc={'this is my website for testing nextjs'}
      />
      <Layout>{display}</Layout>
    </>
  );
};

export default IndexPage;
