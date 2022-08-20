import { useSession } from 'next-auth/react';
import { HTMLAttributes } from 'react';

type NavButtonProps = {
  linkTo: string;
  onClick?: () => void;
} & HTMLAttributes<HTMLAnchorElement>;

const Header = () => {
  const { data: session } = useSession();
  const NavButton = ({ children, linkTo, ...props }: NavButtonProps) => (
    <div className="px-2 text-yellow-20">
      <a {...props} href={linkTo}>
        {children}
      </a>
    </div>
  );
  return (
    <div className="text-yellow-200 bg-yellow-900 w-full h-12 flex justify-between">
      <NavButton linkTo="/" className="font-bold h-full flex items-center px-4">
        degen
      </NavButton>

      <div className="flex h-full items-center">
        {!session && <NavButton linkTo="/login">login</NavButton>}
        {!!session && <NavButton linkTo="/profile">profile</NavButton>}
      </div>
    </div>
  );
};

export default Header;
