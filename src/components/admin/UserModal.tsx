import { Role, User } from '@prisma/client';
import { trpc } from '../../utils/trpc';

type Props = {
    user: User;
    onClose: () => void;
    show: boolean;
};

const UserModal = ({ user, onClose, show }: Props) => {
    if (!show) return null;
    const utils = trpc.useContext();
    const mutation = trpc.useMutation(['user.updateRole'], {
        onSuccess() {
            utils.invalidateQueries(['users.get-all']);
        },
    });
    const handleOnPromoteClick = () => {
        mutation.mutate({ userId: user.id, role: Role.ADMIN });
        onClose();
    };
    const handleOnDemoteClick = () => {
        mutation.mutate({ userId: user.id, role: Role.USER });
        onClose();
    };
    const PromoteOrDemoteButton = (isAdmin: boolean) => (
        <button
            onClick={isAdmin ? handleOnDemoteClick : handleOnPromoteClick}
            className="border-2 border-gray-300 bg-green-600 hover:bg-green-700 px-8 py-1 rounded"
        >
            {isAdmin ? 'demote' : 'promote'} to {isAdmin ? 'plebian' : 'admin'}
        </button>
    );
    return (
        <>
            <div className="rounded modal fade fixed top-8 left-1/2 -translate-x-1/2 overflow-clip w-1/2 p-4 shadow-black shadow-lg bg-gray-800 border-2 border-red-500 ease-out ">
                <div className="flex flex-col">
                    {user && (
                        <div>
                            <div>email: {user.email}</div>
                            <div>name: {user.name}</div>
                            <div>role: {user.role}</div>
                        </div>
                    )}
                    <br />
                    <div className="display flex justify-between">
                        {PromoteOrDemoteButton(user.role === Role.ADMIN)}
                        <button
                            onClick={onClose}
                            className="border-2 border-gray-300 bg-gray-600 hover:bg-gray-800 px-8 py-1 rounded"
                        >
                            close
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserModal;
