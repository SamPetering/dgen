import { GetServerSideProps } from 'next';
import { signIn, getSession } from 'next-auth/react';
import { useState } from 'react';
import PrimaryInput from '../components/PrimaryInput';

const Login = ({}) => {
    const btnStyle =
        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
    return (
        <>
            <button className={btnStyle} onClick={() => signIn('google')}>
                Sign in with google
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
