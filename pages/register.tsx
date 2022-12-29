import { FaDiscord } from 'react-icons/fa';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Register() {
	const { data: session } = useSession();
	const router = useRouter();

	if (session) {
		router.push('/');
	}

	return (
		<div className="w-full h-screen flex justify-center items-center p-4">
			<div className="max-w-lg w-full shadow-2xl px-4 py-12 flex flex-col justify-center items-center gap-8">
				<div className="text-lg  text-gray-600">
					You should sign in before you could use <span className="text-blue-700 font-semibold">keeplink</span>
				</div>
				<div>
					<button className="border-2 border-gray-300 px-4 py-2 rounded-lg hover:bg-blue-100">
						<FaDiscord size={42} color="blue" />
					</button>
				</div>
			</div>
		</div>
	);
}
