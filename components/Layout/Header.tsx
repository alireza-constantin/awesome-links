import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import Head from 'next/head';
import { BiLink } from 'react-icons/bi';
import { useRouter } from 'next/router';
import { clsx } from 'clsx';

const Header: FC<{}> = () => {
	const { data: session, status } = useSession();
	const [callbackCalled, setCallbackCalled] = useState(false);

	const router = useRouter();

	useEffect(() => {
		if (!session) {
			if (callbackCalled) return;
			router.push('/register');
			setCallbackCalled(true);
		}
	}, [session]);

	return (
		<>
			<Head>
				<title>Awesome Links</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header className="text-gray-600 body-font">
				<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center gap-4">
					<Link href="/">
						<div className="bg-blue-600 hover:bg-blue-400 rounded-full p-2 cursor-pointer">
							<BiLink size={26} className="text-white " />
						</div>
					</Link>
					<div>
						<p className="text-lg font-medium capitalize">
							Hi {status === 'loading' ? <span className="animate-bounce">...</span> : session?.user?.name}
						</p>
					</div>
					<nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
						<div className="flex items-center space-x-5">
							<button>
								<Link
									href="/favorites"
									className={clsx(
										'inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0',
										'bg-gray-200'
									)}
								>
									{true ? 'All Links' : 'My Favorites'}
								</Link>
							</button>
							<button onClick={() => signOut()}>
								<a className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
									Logout
								</a>
							</button>
						</div>
					</nav>
				</div>
			</header>
		</>
	);
};

export default Header;
