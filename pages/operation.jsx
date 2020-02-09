import Head from '../components/Head';
import Alert from '../components/Alert';
import Layout from '../components/Layout';
import Operation from '../components/Operation';
import { useState } from 'react';

const operationPage = () => {
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState(null);

  const handleAlert = msg => {
    console.log(msg);
    setAlert(true);
    setMessage(msg);
    setTimeout(() => {
      setAlert('');
    }, 1500);
  };

  function handleCloseAlert() {
    setAlert('');
  }

  return (
    <div lang='en'>
      <Head
        title={'Home Page'}
        desc={'this is my website for testing nextjs'}
      />
      <Layout>
        <Operation onClick={handleAlert} />
      </Layout>
      <Alert onClick={handleCloseAlert} message={message} alert={alert} />
    </div>
  );
};

export default operationPage;
