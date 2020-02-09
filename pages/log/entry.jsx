import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Entry from '../../components/Entry';

export default function EntryPage() {
  const router = useRouter();

  return (
    <Layout>
      <Entry query={router.query} />
    </Layout>
  );
}
