//Component for Log page
import localforage from 'localforage';
import { useEffect, useState } from 'react';
import Entry from './Entry';

const Log = () => {
  const [log, setLog] = useState([]);

  useEffect(() => {
    localforage
      .getItem('log')
      .then(log => {
        if (!log) {
          return;
        }
        setLog(log);
      })
      .catch(err => console.log(err));
  }, []); //this '[]' ensures that effect runs only once

  return (
    <>
      <ul className={'mt-6'}>
        {log[0] //loops through log creating list items if there any entries
          ? log.map((item, index) => {
              let isAdd = item.operation === 'add';
              const statement = `${isAdd ? 'Added' : 'Removed'} ${
                item.amount
              } ${isAdd ? 'to' : 'from'} ${item.target}`;

              return (
                //defining element to render for each entry
                <Entry
                  key={index + 2}
                  statement={statement}
                  date={item.dateString}
                  index={index}
                />
              );
            })
          : 'There is nothing in the logs'}
      </ul>
    </>
  );
};

export default Log;
