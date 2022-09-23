import { Session } from 'next-auth';
import { trpc } from '../utils/trpc';
import PrimaryButton from './PrimaryButton';
import Table from './Table';

type Props = {
    session: Session;
};

const FriendDisplay = ({ session }: Props) => {
    const utils = trpc.useContext();
    const declineMutation = trpc.useMutation(['friendRequest.decline']);
    const acceptMutation = trpc.useMutation(['friendRequest.accept']);
    const { data: friendsResponse, isLoading: friendsLoading } = trpc.useQuery([
        'user.getUserFriends',
        { userId: session.user.id },
    ]);
    const { data: friendRequestResponse } = trpc.useQuery([
        'user.getUserFriendRequests',
        { userId: session.user.id },
    ]);

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
            <div className="flex justify-end gap-4">
                <PrimaryButton
                    onClick={() => handleDeclineClick()}
                    text="decline"
                />
                <PrimaryButton
                    onClick={() => handleAcceptClick()}
                    text="accept"
                />
            </div>
        );
    };
    const friendRequests = friendRequestResponse?.map((req) => ({
        id: req.id,
        name: req.friend.name,
    }));

    const renderChallengeButton = (id: string | number) => (
        <PrimaryButton
            text="challenge"
            onClick={() => console.log('challenge user: ', id)}
        />
    );

    return (
        <div className="flex flex-col justify-between gap-4">
            {!!friendRequests?.length && (
                <>
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
            {friendsLoading ? (
                <div>loading...</div>
            ) : friends.length ? (
                <Table
                    headers={['friends']}
                    items={friends}
                    rightAction={renderChallengeButton}
                />
            ) : (
                <a href="https://www.youtube.com/watch?v=4Uk_A2n_9HI">
                    oh what a lonely boy
                </a>
            )}
        </div>
    );
};

export default FriendDisplay;
