import { FC } from 'react';
import { signOut, getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { trpc } from '../utils/trpc';

type Props = {
    session: Session;
};
const btnStyle =
    'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
const Profile: FC<Props> = ({ session }) => {
    const { data: userData, isLoading } = trpc.useQuery([
        'user.getUserProfile',
        { userId: session.user.id },
    ]);
    if (isLoading) return <div>...loading</div>;
    return (
        <div>
            <div>Welcome {session?.user?.name}</div>
            <button className={btnStyle} onClick={() => signOut()}>
                Sign out
            </button>
        </div>
    );
};

export default Profile;

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
