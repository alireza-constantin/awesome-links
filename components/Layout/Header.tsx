import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

const Header = () => {
	const { data: session } = useSession();

	return (
		<header className="text-gray-600 body-font">
			<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center gap-4">
				<Link href="/">
					<a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
						<svg
							className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
							></path>
						</svg>
					</a>
				</Link>
				<div>
					<p className="text-lg font-medium capitalize">Hi {session?.user?.name}</p>
				</div>
				<nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
					{session?.user ? (
						<div className="flex items-center space-x-5">
							<Link href="/favorites">
								<a className="inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
									My Favorites
								</a>
							</Link>
							<Link href="/api/auth/logout">
								<a className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
									Logout
								</a>
							</Link>
						</div>
					) : (
						<Link href="/api/auth/login">
							<a className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
								Login
							</a>
						</Link>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Header;
