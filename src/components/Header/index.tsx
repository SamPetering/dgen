import { signOut, useSession } from 'next-auth/react';
import { NavButton } from '../NavButton';

const Header = () => {
    const { data: session } = useSession();
    return (
        <div className="bg-gray-700 w-full h-12 flex justify-between">
            <NavButton linkTo="/" text="dgen" />

            <div className="flex h-full items-center">
                {!session && <NavButton linkTo="/login" text="login" />}
                {!!session && (
                    <>
                        <NavButton linkTo="/profile" text="profile" />
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            onClick={() => signOut()}
                        >
                            Sign out
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
