import Head from '../components/Head';
import Alert from '../components/Alert';
import Layout from '../components/Layout';
import Operation from '../components/Operation';
import { useState } from 'react';

const OperationPage = () => {
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState(null);

  const handleAlert = msg => {
    console.log(msg);
    setAlert(true);
    setMessage(msg);
    // hide alert after short period of time
    setTimeout(() => {
      setAlert('');
    }, 2200);
  };

  function handleCloseAlert() {
    setAlert(false);
  }

  return (
    <>
      <Head
        title={'Home Page'}
        desc={'this is my website for testing nextjs'}
      />
      <Layout>
        <Operation fireAlert={handleAlert} />
      </Layout>
      <Alert onClick={handleCloseAlert} message={message} alert={alert} />
    </>
  );
};

export default OperationPage;
