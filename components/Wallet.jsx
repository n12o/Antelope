//Component for Index page
const Wallet = props => {
  return (
    <>
      <p className={'mt-20 text-center'}>
        Balance: {props.wallet.balance || '0'}
      </p>
      <p className={'my-5 text-center'}>Debt: {props.wallet.debt || '0'}</p>
      <p className={'my-5 text-center'}>Loaned: {props.wallet.loan || '0'}</p>
    </>
  );
};

export default Wallet;
