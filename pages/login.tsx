import { useSession, signIn, signOut } from 'next-auth/react';

const Login = ({}) => {
  const { data: session } = useSession();
  const btnStyle =
    'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
  if (session) {
    return (
      <>
        <p>Welcome, {session.user?.email}</p>
        {!!session?.user?.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={session.user?.image}
            alt=""
            style={{ borderRadius: '50px' }}
          />
        )}
        <button className={btnStyle} onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  } else {
    return (
      <>
        <p>You are not signed in.</p>
        <button className={btnStyle} onClick={() => signIn()}>
          Sign in
        </button>
      </>
    );
  }
};

export default Login;
