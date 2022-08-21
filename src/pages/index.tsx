import type { NextPage } from 'next';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(['hello', { text: 'Sam' }]);
  if (isLoading || !data) return <div>Loading...</div>;
  return (
    <>
      <div className="text-3xl font-bold">{data.greeting}</div>
    </>
  );
};

export default Home;
