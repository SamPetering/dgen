import { GetServerSideProps } from 'next';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';

const Login = ({}) => {
  const btnStyle =
    'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
  return (
    <>
      <p>You are not signed in.</p>
      <button className={btnStyle} onClick={() => signIn()}>
        Sign in
      </button>
    </>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session)
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      },
    };
  return {
    props: { session },
  };
};
