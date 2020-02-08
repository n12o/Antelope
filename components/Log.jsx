//Component for Log page
import localforage from 'localforage';
import { useEffect, useState } from 'react';

const Log = () => {
  const [log, setLog] = useState([]);

  useEffect(() => {
    localforage
      .getItem('log')
      .then(newLog => {
        if (!newLog) {
          console.log('the is no log');
          return;
        }
        setLog(newLog);
        console.log(newLog);
      })
      .catch(err => console.log(err));
  }, []); //this [] ensures that effect runs only once

  return (
    <>
      <ul className={'mt-6'}>
        {log[0]
          ? log.map((item, index) => {
              let isAdd = item.operation === 'add';

              const statement = `${isAdd ? 'Added' : 'Removed'} ${
                item.amount
              } ${isAdd ? 'to' : 'from'} ${item.target}`;
              return (
                <li
                  className={
                    'w-9/12 mx-auto my-4 bg-teal-300 rounded-lg py-2 px-4 shadow-lg'
                  }
                  key={index}
                >
                  <p>{statement}</p>
                  <p className={'text-xs text-gray-700 text-right'}>
                    {item.dateString}
                  </p>
                </li>
              );
            })
          : 'There is nothing in the logs'}
      </ul>
    </>
  );
};

export default Log;
