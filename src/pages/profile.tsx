import { FC } from 'react';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import UserSessionCard from '../components/UserSessionCard';
import FriendDisplay from '../components/FriendDisplay';

type Props = {
    session: Session;
};

const Profile: FC<Props> = ({ session }) => {
    return (
        <div className="grid grid-cols-6 gap-4">
            <div className="col-span-3">
                <UserSessionCard session={session} />
            </div>
            <div className="col-span-3">
                <FriendDisplay session={session} />
            </div>
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
