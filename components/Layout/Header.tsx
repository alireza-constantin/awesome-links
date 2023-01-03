import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { FC, useEffect } from 'react';
import Head from 'next/head';
import { BiLink } from 'react-icons/bi';
import { useRouter } from 'next/router';

const Header: FC<{}> = () => {
	const { pathname, push } = useRouter();
	const { data: session, status } = useSession({ required: true });
	// const [isCallbackCalled, setIsCallbackCalled] = useSession()

	// useEffect(() => {
	// 	if (!session) {
	// 		push('/register');
	// 	}
	// }, [session]);

	const isFavorite = pathname === '/favorites';

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
							{isFavorite ? (
								<Link href="/">
									<a className='className="inline-flex items-center border-0 py-1 px-3 text-white focus:outline-none hover:bg-blue-400/80 rounded text-base mt-4 md:mt-0 bg-blue-500'>
										All Links
									</a>
								</Link>
							) : (
								<Link href="/favorites">
									<a className="inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:text-gray-50 hover:bg-red-300 rounded text-base mt-4 md:mt-0">
										Favorites
									</a>
								</Link>
							)}
							<button onClick={() => signOut()}>
								<a className="inline-flex items-center bg-blue-100 border-0 py-1 px-3 focus:outline-none hover:bg-blue-400 hover:text-white rounded text-base mt-4 md:mt-0">
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
