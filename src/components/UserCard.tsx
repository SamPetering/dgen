import { PublicUserData } from '../types/user';
import Image from 'next/image';

type Props = {
    userData: PublicUserData;
    action?: () => JSX.Element;
};

const UserCard = ({ userData, action }: Props) => {
    return (
        <div className="border-2 border-slate-300 w-96 overflow-clip rounded p-4 flex justify-between">
            <Image
                alt="user image"
                src={userData.image ?? ''}
                height={100}
                width={100}
                className="rounded-full"
            />
            <div className="flex flex-col space-y-1 justify-between">
                <div className="flex">
                    {userData.isAdmin ? (
                        <div className="mr-2 select-none">👑</div>
                    ) : null}
                    <p className="font-bold">{userData.name}</p>
                </div>
                <div className="self-end text-slate-400 italic">
                    {userData.username}
                </div>
                {action && <div className="self-end">{action()}</div>}
            </div>
        </div>
    );
};

export default UserCard;
