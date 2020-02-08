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
      <ul className={'ml-16 mt-6'}>
        {log[0]
          ? log.map((item, index) => {
              let isAdd = item.operation === 'add';

              const statement = `${isAdd ? 'Added' : 'Removed'} ${
                item.amount
              } ${isAdd ? 'to' : 'from'} ${item.target}`;
              return (
                <li className={'my-4'} key={index}>
                  {statement}
                </li>
              );
            })
          : 'There is nothing in the logs'}
      </ul>
    </>
  );
};

export default Log;
