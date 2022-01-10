import Link from 'next/link';
import { MenuIcon } from '@heroicons/react/outline';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, provider } from '../firebase';
import { useRouter } from 'next/router';
import { signInWithPopup } from 'firebase/auth';

export default function Header() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const signIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then(() => router.push('/channels'))
      .catch((error) => alert(error.message));
  };

  return (
    <header className=" flex items-center justify-between py-6 px-6 bg-discord_blue">
      <Link href="/" passHref>
        <h1 className=" text-[30px] font-bold text-white uppercase cursor-pointer">
          Discord
        </h1>
      </Link>
      <div className=" hidden lg:flex space-x-6">
        <a className="link">Download</a>
        <a className="link">Why Discord?</a>
        <a className="link">Nitro</a>
        <a className="link">Safety</a>
        <a className="link">Support</a>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={!user ? signIn : () => router.push('/channels')}
          className=" bg-white p-2 rounded-full text-xs md:text-sm px-4 focus:outline-none hover:shadow-2xl duration-200 ease-in-out whitespace-nowrap font-medium hover:text-discord_blurple transition"
        >
          {!user ? 'Login' : 'Open Discord'}
        </button>
        <MenuIcon className=" text-white h-9 cursor-pointer lg:hidden" />
      </div>
    </header>
  );
}
