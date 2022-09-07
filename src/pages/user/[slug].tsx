import { FC } from 'react';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { prisma } from '../../db/client';
import { Role } from '@prisma/client';

type PublicUserData = {
    name: string | null;
    isAdmin: boolean;
    username: string | null;
};

type Props = {
    loggedIn: boolean;
    userData: PublicUserData | null;
};

const User: FC<Props> = ({ loggedIn, userData }) => {
    return <div>{JSON.stringify({ userData })}</div>;
};

export default User;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const username = context.query.slug as string;
    console.log({ username });
    const session = await getSession(context);
    const userResponse = await prisma.user.findFirst({
        where: {
            username: username,
        },
    });
    console.log({ userResponse });
    const userData: PublicUserData | null = userResponse
        ? {
              isAdmin: userResponse.role === Role.ADMIN,
              name: userResponse.name,
              username: userResponse.username,
          }
        : null;
    return {
        props: { loggedIn: !!session, userData },
    };
};
