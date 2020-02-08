//Component for Index page
import { useState, useEffect } from 'react';

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [debt, setDebt] = useState(0);

  useEffect(() => {
    let storedBalance = localStorage.getItem('balance');
    storedBalance && !balance ? setBalance(storedBalance) : null;
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
