import { useSession } from 'next-auth/react'
import { NavButton } from '../NavButton'

const Header = () => {
    const { data: session } = useSession()

    return (
        <div className="bg-yellow-500 w-full h-12 flex justify-between">
            <NavButton linkTo="/" text="dgen" />

            <div className="flex h-full items-center">
                {!session && <NavButton linkTo="/login" text="login" />}
                {!!session && <NavButton linkTo="/profile" text="profile" />}
            </div>
        </div>
    )
}

export default Header
