import { Role, User } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import UserModal from '../../components/admin/UserModal';
import { trpc } from '../../utils/trpc';

const Profile = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const { data, isLoading } = trpc.useQuery(['users.get-all']);
    const userMutation = trpc.useMutation(['user.getUser']);
    if (isLoading || !data) return <div>loading...</div>;
    const handleRowClick = async (userId: string) => {
        const result = await userMutation.mutateAsync({ userId });
        if (result) {
            setSelectedUser(result);
            setIsOpen(true);
        }
    };
    const handleOnModalClose = () => {
        setIsOpen(false);
    };
    return (
        <>
            <div className="overflow-x-auto mt-12 relative sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-300">
                    <thead className="text-xs uppercase bg-gray-800 text-gray-400">
                        <tr>
                            {Object.keys(data[0] ?? {}).map((key) => (
                                <th key={key} className="py-3 px-6">
                                    {key}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user, i) => (
                            <tr
                                key={i}
                                className="border-b bg-gray-700 border-gray-600"
                            >
                                {Object.values(user).map((val, i) => (
                                    <td
                                        className="py-4 px-6"
                                        key={i}
                                        onClick={() => handleRowClick(user.id)}
                                    >
                                        {val?.toString()}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedUser && (
                <UserModal
                    show={isOpen}
                    onClose={handleOnModalClose}
                    user={selectedUser}
                />
            )}
        </>
    );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session || !(session.user.role === Role.ADMIN))
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
