import { Role, User } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import UserModal from '../../components/admin/UserModal';
import Table from '../../components/Table';
import { trpc } from '../../utils/trpc';

const Users = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const { data, isLoading } = trpc.useQuery(['users.get-all']);
    const userMutation = trpc.useMutation(['user.getUser']);
    if (isLoading || !data) return <div>loading...</div>;
    const handleRowClick = async (userId: string | number) => {
        const result = await userMutation.mutateAsync({
            userId: userId.toString(),
        });
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
            <Table
                headers={['id', 'name', 'email']}
                items={data}
                onRowClick={handleRowClick}
            />
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

export default Users;

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
