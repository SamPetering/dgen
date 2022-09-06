import { FC } from 'react';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { trpc } from '../utils/trpc';
import Table from '../components/Table';

type Props = {
    session: Session;
};
const Friends: FC<Props> = ({ session }) => {
    const { data, isLoading } = trpc.useQuery([
        'user.getUserFriends',
        { userId: session.user.id },
    ]);
    if (!data?.friends && isLoading) return <div>loading...</div>;
    const friends = data?.friends?.map(({ id, name }) => ({ id, name })) ?? [];
    const headers = Object.keys(friends?.[0] ?? {});
    return (
        <div>
            <h3>Friends</h3>
            <Table headers={headers} items={friends} />
        </div>
    );
};

export default Friends;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session)
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    return {
        props: { session },
    };
};
