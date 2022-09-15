import { FC } from 'react';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { prisma } from '../../db/client';
import { Role } from '@prisma/client';
import { PublicUserData } from '../../types/user';
import UserCard from '../../components/UserCard';

type Props = {
    loggedIn: boolean;
    userData: PublicUserData | null;
};

const User: FC<Props> = ({ loggedIn, userData }) => {
    if (!userData) return <div>user not found</div>;
    return (
        <div className="mt-4">
            <UserCard userData={userData} />
        </div>
    );
};

export default User;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const username = context.query.slug as string;
    const session = await getSession(context);
    const userResponse = await prisma.user.findFirst({
        where: {
            username: username,
        },
    });
    const userData: PublicUserData | null = userResponse
        ? {
              isAdmin: userResponse.role === Role.ADMIN,
              name: userResponse.name,
              username: userResponse.username,
              image: userResponse.image,
          }
        : null;
    return {
        props: { loggedIn: !!session, userData },
    };
};
