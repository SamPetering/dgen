import { Session } from 'next-auth';
import Image from 'next/image';

type Props = {
    session: Session;
};

const UserCard = ({ session }: Props) => {
    return (
        <div className="border-2 border-slate-300 w-full overflow-clip rounded-lg p-4 flex justify-between">
            <Image
                alt="user image"
                src={session.user.image ?? ''}
                height={100}
                width={100}
                className="rounded-full"
            />
            <div className="flex flex-col space-y-1 justify-between">
                <div className="flex">
                    {session.user.role === 'ADMIN' ? (
                        <div className="mr-2 select-none">👑</div>
                    ) : null}
                    <p className="font-bold">{session.user.name}</p>
                </div>
                <div className="self-end text-slate-400 italic">
                    username: {session.user.username}
                </div>
            </div>
        </div>
    );
};

export default UserCard;
