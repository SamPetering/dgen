import { FC } from 'react';
import { useSession, signOut, getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { prisma } from '../src/db/client';
import { User } from '@prisma/client';

const Profile = (props: any) => {
  return <div>{props.users}</div>;
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
  const users = await prisma.user.findMany();
  return {
    props: { users: JSON.stringify(users) },
  };
};
