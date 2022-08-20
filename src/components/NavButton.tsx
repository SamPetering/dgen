import Link from 'next/link';

type NavButtonProps = {
  linkTo: string;
  onClick?: () => void;
  text: string;
};

export const NavButton = ({ text, linkTo }: NavButtonProps) => (
  <Link href={linkTo}>
    <a className="font-bold h-full flex items-center px-4 text-2xl text-white hover:text-gray-100 hover:bg-yellow-600">
      {text}
    </a>
  </Link>
);
