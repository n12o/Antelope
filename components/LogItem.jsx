import Link from 'next/link';

function LogItem(props) {
  return (
    <Link href={`/log/entry?index=${props.index}`}>
      <li
        className={
          'w-9/12 mx-auto my-4 bg-teal-300 rounded-lg py-2 px-4 shadow-lg cursor-pointer'
        }
      >
        <p>{props.statement}</p>
        <p className={'text-xs text-gray-700 text-right'}>{props.date}</p>
      </li>
    </Link>
  );
}

export default LogItem;
