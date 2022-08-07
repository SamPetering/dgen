import { useSession, signIn, signOut } from 'next-auth/react';

const Login = ({}) => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <p>Welcome, {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  } else {
    return (
      <>
        <p>You are not signed in.</p>
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }
};

export default Login;
