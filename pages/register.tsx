import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Register() {
	const { data: session, status } = useSession();
	const router = useRouter();

	if (session) {
		router.push('/');
	}

	if (status === 'loading' || status === 'authenticated') return <div>....loading</div>;

	return (
		<div className="w-full h-screen flex justify-center items-center p-4">
			<div className="max-w-lg w-full shadow-2xl px-4 py-12 flex flex-col justify-center items-center gap-8">
				<div className="text-lg  text-gray-600">
					Please Sign-in so you could use <span className="text-blue-700 font-semibold">keeplink's</span> full potential
				</div>
				<div>
					<button
						onClick={() => signIn()}
						className="border-2 border-gray-300 px-4 py-2 rounded-lg hover:bg-blue-100 text-lg font-semibold text-gray-600"
					>
						Sign-in
					</button>
				</div>
			</div>
		</div>
	);
}
