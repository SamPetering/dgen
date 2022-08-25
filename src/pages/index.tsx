import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
    const { data: session } = useSession()
    const { data, isLoading } = trpc.useQuery(['users.get-all'])
    if (isLoading || !data) return <div>Loading...</div>
    return (
        <>
            <div className="text-3xl font-bold">{session?.user?.name}</div>
        </>
    )
}

export default Home
