import { FC } from 'react';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { prisma } from '../../db/client';
import { Role } from '@prisma/client';
import { PublicUserData } from '../../types/user';
import UserCard from '../../components/UserCard';
import { trpc } from '../../utils/trpc';
import { Session } from 'next-auth';

type Props = {
    userData: PublicUserData;
    session: Session;
};

const User: FC<Props> = ({ userData, session }) => {
    const utils = trpc.useContext();
    const { data: requestExists, isLoading: loadingFriendRequest } =
        trpc.useQuery([
            'friendRequest.exists',
            { userId: userData?.id, requestorId: session.user.id },
        ]);
    const createFriendRequestMutation = trpc.useMutation(
        ['friendRequest.create'],
        {
            onSuccess() {
                utils.invalidateQueries('friendRequest.exists');
            },
        }
    );
    const pendingAction = () => <div>request pending</div>;
    const addFriendAction = () => {
        const handleButtonClick = () => {
            createFriendRequestMutation.mutateAsync({
                requestorId: session.user.id,
                userId: userData.id,
            });
        };
        return (
            <button
                className="bg-green-600 rounded px-2 font-bold hover:bg-green-700"
                onClick={handleButtonClick}
            >
                add friend
            </button>
        );
    };
    const getCardAction = () => {
        console.log({ requestExists, loadingFriendRequest });
        if (!session || loadingFriendRequest) return undefined;
        if (requestExists) return pendingAction;
        return addFriendAction;
    };

    return (
        <div className="mt-4">
            <UserCard userData={userData} action={getCardAction()} />
        </div>
    );
};

export default User;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const username = context.query.slug as string;
    const session = await getSession(context);
    if (!session)
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };

    const userResponse = await prisma.user.findFirst({
        where: {
            username: username,
        },
    });

    if (!userResponse)
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };

    const userData: PublicUserData | null = userResponse
        ? {
              isAdmin: userResponse.role === Role.ADMIN,
              name: userResponse.name,
              username: userResponse.username,
              image: userResponse.image,
              id: userResponse.id,
          }
        : null;

    return {
        props: { session, userData },
    };
};
