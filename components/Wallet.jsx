//Component for Index page
import localforage from 'localforage';

const Wallet = props => {
  const handleDelete = async () => {
    await localforage
      .removeItem('wallet')
      .then(() => {
        props.onRemove();
      })
      .catch(err => console.error(err));
  };

  const handleExport = () => {
    localforage
      .getItem('wallet')
      .then(wallet => {
        download(wallet, 'wallet.ant', 'application/json');
      })
      .catch(err => console.log(err));
  };

  function download(content, fileName, contentType) {
    let a = document.createElement('a');
    content = JSON.stringify(content);
    let file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  return (
    <>
      <p className={'mt-20 text-center'}>
        Balance: {props.wallet.balance || '0'}
      </p>
      <p className={'my-5 text-center'}>Debt: {props.wallet.debt || '0'}</p>
      <p className={'my-5 text-center'}>Loaned: {props.wallet.loan || '0'}</p>
      <p
        className={'mt-32 text-center cursor-pointer text-pink-700'}
        onClick={handleDelete}
      >
        Delete wallet
      </p>
      <p
        className={'my-5 text-center cursor-pointer text-pink-700'}
        onClick={handleExport}
      >
        Export wallet
      </p>
    </>
  );
};

export default Wallet;
