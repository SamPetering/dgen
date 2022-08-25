import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useState } from 'react'
import { trpc } from '../utils/trpc'

const Profile = () => {
    const [email, setEmail] = useState<string>('')
    const [name, setName] = useState<string>('')
    const { data, isLoading } = trpc.useQuery(['users.get-all'])
    const utils = trpc.useContext()
    const addUser = trpc.useMutation(['user.create'])
    if (isLoading || !data) return <div>loading...</div>
    const handleOnAddUserClick = () => {
        addUser.mutate(
            { name, email },
            {
                onSuccess: () => {
                    utils.invalidateQueries(['users.get-all'])
                },
            }
        )
        setEmail('')
        setName('')
    }
    return (
        <>
            <table>
                <tr>
                    {Object.keys(data[0] ?? {}).map((key) => (
                        <th key={key}>{key}</th>
                    ))}
                </tr>
                {data.map((user, i) => (
                    <tr key={i}>
                        {Object.values(user).map((val, i) => (
                            <td className="px-2" key={i}>
                                {val?.toString()}
                            </td>
                        ))}
                    </tr>
                ))}
            </table>
            <div className="w-full max-w-xs">
                <div className="mt-4">
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
                        id="email"
                        type="text"
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <button onClick={handleOnAddUserClick}>add user</button>
                </div>
            </div>
        </>
    )
}

export default Profile

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)
    if (!session)
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    return {
        props: { session },
    }
}
