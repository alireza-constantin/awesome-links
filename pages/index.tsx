import { Link } from '../types/types';

import { useQuery } from 'urql';
import { AwesomeLink } from '../components/AwesomeLink';
import { BiPlus } from 'react-icons/bi';
import { useMemo, useState } from 'react';
import { CreateLink } from '../components/CreateLink';
import { useSession } from 'next-auth/react';
import { Loader } from '../components/Loader';

const LinksQuery = `#graphql
  query($favorite: Boolean!, $cursor: String!) {
    links (favorite: $favorite, cursor: $cursor) {
		id
		title
		description
		url
		imageUrl
		category
		userId
	}
  }
`;

export default function Index() {
	const [isOpen, setIsOpen] = useState(false);
	const { status } = useSession();

	const pauseQuery = status === 'unauthenticated' || status === 'loading';

	const [result, _] = useQuery({
		query: LinksQuery,
		pause: pauseQuery,
		variables: {
			favorite: false,
			cursor: '',
		},
		context: useMemo(
			() => ({
				additionalTypenames: ['Link'],
			}),
			[]
		),
	});

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	if (result.fetching) return <Loader />;

	return (
		<>
			<div className="container px-4 h-screen mx-auto max-w-5xl my-12">
				{!result || result.data?.links.length === 0 ? (
					<div className="text-center mt-20">
						<div className="text-lg text-gray-500 font-semibold">Sorry, There isn't any links</div>
						<button
							className="border-2 mt-6 border-gray-300 px-4 py-2 rounded-lg hover:bg-blue-100 text-lg font-semibold text-gray-600"
							onClick={openModal}
						>
							Create Link
						</button>
					</div>
				) : (
					<>
						<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
							{result?.data?.links.map((link: Link) => (
								<AwesomeLink
									category={link.category}
									description={link.description}
									id={link.id}
									imageUrl={link.imageUrl}
									title={link.title}
									url={link.url}
									key={link.id}
								/>
							))}
						</ul>
					</>
				)}
			</div>
			<div className="fixed bottom-10 right-3">
				<div onClick={openModal} className="bg-blue-600 hover:bg-blue-400 rounded-full p-2 cursor-pointer">
					<BiPlus size={28} className="text-white " />
				</div>
			</div>
			<CreateLink isOpen={isOpen} closeModal={closeModal} />
		</>
	);
}
