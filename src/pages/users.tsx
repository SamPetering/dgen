import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { trpc } from '../utils/trpc';

const Profile = () => {
    const { data, isLoading } = trpc.useQuery(['users.get-all']);
    if (isLoading || !data) return <div>loading...</div>;

    return (
        <div className="overflow-x-auto mt-12 relative sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-600"
                        >
                            {Object.values(user).map((val, i) => (
                                <td className="py-4 px-6" key={i}>
                                    {val?.toString()}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
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
