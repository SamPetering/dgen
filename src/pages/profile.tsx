import { FC } from 'react';
import { signOut, getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';

type Props = {
    session: Session;
};
const btnStyle =
    'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
const Profile: FC<Props> = ({ session }) => {
    return (
        <div>
            <div>Welcome {session?.user?.name}</div>
            {!!session?.user?.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={session.user?.image}
                    alt=""
                    style={{ borderRadius: '50px' }}
                />
            )}
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
