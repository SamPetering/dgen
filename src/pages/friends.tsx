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
    const utils = trpc.useContext();
    const declineMutation = trpc.useMutation(['friendRequest.decline']);
    const acceptMutation = trpc.useMutation(['friendRequest.accept']);
    const { data: friendsResponse, isLoading: friendsLoading } = trpc.useQuery([
        'user.getUserFriends',
        { userId: session.user.id },
    ]);
    const { data: friendRequestResponse, isLoading: friendRequestsLoading } =
        trpc.useQuery([
            'user.getUserFriendRequests',
            { userId: session.user.id },
        ]);
    if ((!friendsResponse?.friends && friendsLoading) || friendRequestsLoading)
        return <div>loading...</div>;
    const friends =
        friendsResponse?.friends?.map(({ id, name }) => ({ id, name })) ?? [];

    const friendRequestRightAction = (requestId: string | number) => {
        const handleAcceptClick = () => {
            acceptMutation.mutateAsync(
                {
                    friendRequestId: Number(requestId),
                },
                {
                    onSuccess() {
                        utils.invalidateQueries(['user.getUserFriends']);
                        utils.invalidateQueries(['user.getUserFriendRequests']);
                    },
                }
            );
        };
        const handleDeclineClick = () => {
            declineMutation.mutateAsync(
                {
                    friendRequestId: Number(requestId),
                },
                {
                    onSuccess() {
                        utils.invalidateQueries(['user.getUserFriends']);
                        utils.invalidateQueries(['user.getUserFriendRequests']);
                    },
                }
            );
        };
        return (
            <div className="flex justify-end">
                <button
                    className="bg-slate-800 py-2 px-4 rounded hover:bg-slate-900"
                    onClick={() => handleDeclineClick()}
                >
                    decline
                </button>
                <button
                    className="bg-slate-800 py-2 px-4 rounded hover:bg-slate-900 ml-2"
                    onClick={() => handleAcceptClick()}
                >
                    accept
                </button>
            </div>
        );
    };
    const friendRequests = friendRequestResponse?.map((req) => ({
        id: req.id,
        name: req.friend.name,
    }));
    return (
        <div>
            {!!friendRequests?.length && (
                <>
                    <h3>FriendRequests</h3>
                    <Table
                        headers={['friend requests']}
                        items={friendRequests.map((req) => ({
                            id: req.id,
                            name: req.name ?? '',
                        }))}
                        rightAction={friendRequestRightAction}
                    />
                </>
            )}
            <br />
            <h3>Friends</h3>
            <Table headers={['friends']} items={friends} />
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
