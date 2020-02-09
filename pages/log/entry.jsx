import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import localforage from 'localforage';

const centerElement = 'block my-8 mx-auto text-center';

export default function EntryPage() {
  const router = useRouter();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Query id: ' + router.query.index);
    if (!router.query.index) {
      console.log('There is no query yet. Skipping');
    } else {
      console.log('there is a query. Doing something');
      localforage.getItem('log').then(log => {
        if (!log) {
          console.log('there is no log. Returning');
          setLoading(false);
        } else {
          setEntry(log[router.query.index]);
          setLoading(false);
          console.log('entry set');
        }
      });
    }
  }, [router.query]); //trigger effect only when router query changes

  return (
    <Layout>
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
    </Layout>
  );
}
