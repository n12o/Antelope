import { useEffect, useState } from 'react';
import localforage from 'localforage';

const centerElement = 'block my-8 mx-auto text-center';

export default function EntryPage(props) {
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Query id: ' + props.query.index);
    if (!props.query.index) {
      console.log('There is no query yet. Skipping');
    } else {
      console.log('there is a query. Doing something');
      localforage.getItem('log').then(log => {
        if (!log) {
          console.log('there is no log. Returning');
          setLoading(false);
        } else {
          setEntry(log[props.query.index]);
          setLoading(false);
          console.log('entry set');
        }
      });
    }
  }, [props.query]); //trigger effect only when queryer query changes

  return (
    <>
      {loading ? (
        ''
      ) : (
        <>
          <h1 className={centerElement}>{entry ? entry.dateString : ''}</h1>
          <p className={centerElement}>
            Amount changed: {entry ? entry.amount : ''}
          </p>
          <p className={centerElement}>
            Operation made: {entry ? entry.operation : ''}
          </p>
          <p className={centerElement}>Note:</p>
          <p className={centerElement}>
            {entry ? entry.note : 'There is nothing in the note'}
          </p>
        </>
      )}
    </>
  );
}
