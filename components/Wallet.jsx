//Component for Index page
import localforage from 'localforage';
import { useEffect, useState } from 'react';

const Wallet = () => {
  const [balance, setBalance] = useState(null);
  const [debt, setDebt] = useState(null);
  const [loan, setLoan] = useState(null);

  useEffect(() => {
    localforage
      .getItem('wallet')
      .then(wallet => {
        if (!wallet) {
          return;
        }
        setBalance(wallet.balance);
        setDebt(wallet.debt);
        setLoan(wallet.loan);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <p className={'mt-20 text-center'}>Balance: {balance || '0'}</p>
      <p className={'my-5 text-center'}>Debt: {debt || '0'}</p>
      <p className={'my-5 text-center'}>Loaned: {loan || '0'}</p>
    </>
  );
};

export default Wallet;
