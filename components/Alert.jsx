function Alert(props) {
  const red = 'bg-red-100 border-red-400 text-red-700';
  const green = 'bg-green-100 border-green-400 text-green-700';
  const textRed = 'text-red-500';
  const textGreen = 'text-green-500';

  let message;
  switch (props.message) {
    case 'success':
      message = 'You have change your balance and added new entry to the log.';
      break;
    case 'not validated':
      message = 'Please fill required form fields';
      break;
    case 'negative':
      message =
        'Amount must be positive. Please change operation if you want to remove money';
      break;
    case 'less than zero':
      message = 'You cannot have negative money in your wallet';
      break;
    case 'isNaN':
      message = 'Amount must be a number';
      break;
    default:
      message = 'Sorry, something went wrong. Please try again later';
      break;
  }

  return (
    <div
      className={`absolute w-screen transition-all ease-out duration-700 bottom-0 mb-20 ${
        props.alert ? '' : 'opacity-0 pointer-events-none'
        }`}
    >
      <div
        className={`border ${
          props.message === 'success' ? green : red
          } px-4 py-3 rounded relative mx-4`}
        role='alert'
      >
        <strong className='font-bold'>
          {props.message === 'success' ? 'Success!' : 'Failure'}
        </strong>
        <span className='block sm:inline'>{message}</span>
        <span
          className='absolute top-0 bottom-0 right-0 px-4 py-3'
          onClick={props.onClick}
        >
          <svg
            className={`fill-current h-6 w-6  ${
              props.message === 'success' ? textGreen : textRed
              }`}
            role='button'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
          >
            <title>Close</title>
            <path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default Alert;
