//Component for Index page
import { useState, useEffect } from 'react';

const Wallet = () => {
  const [balance, setBalance] = useState(null);
  const [debt, setDebt] = useState(null);

  useEffect(() => {
    let storedBalance = localStorage.getItem('balance');
    storedBalance ? setBalance(storedBalance) : setBalance(0);
    debt ? setDebt(debt) : null;
  });

  return (
    <>
      <p>Balance: {balance}</p>
      <p>Debt: {debt}</p>
    </>
  );
};

export default Wallet;
