import Layout from '../components/Layout';
import { Link } from '../types/types';

import { useQuery } from 'urql';
import { AwesomeLink } from '../components/AwesomeLink';
import { BiPlus } from 'react-icons/bi';
import { useState } from 'react';
import { CreateLink } from '../components/CreateLink';
import { useSession } from 'next-auth/react';

const LinksQuery = `#graphql
  query($favorite: Boolean!) {
    links (favorite: $favorite) {
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

export default function Home() {
	const [isOpen, setIsOpen] = useState(false);
	const [isFavorite, setIsFavorite] = useState(false);
	const { status } = useSession();

	const pauseQuery = status === 'unauthenticated' || status === 'loading';

	console.log(pauseQuery);

	const [result, reexecuteQuery] = useQuery({
		query: LinksQuery,
		pause: pauseQuery,
		variables: {
			favorite: isFavorite,
		},
	});

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	console.log(result);

	return (
		<Layout fav={isFavorite} setFav={setIsFavorite}>
			<div className="container h-screen mx-auto max-w-5xl my-12">
				{result.data?.links.length === 0 ? (
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
					<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
						{result?.data?.links.map((link: Link) => (
							<AwesomeLink
								reexecuteQuery={reexecuteQuery}
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
				)}
			</div>
			<div className="sticky bottom-10 flex justify-end items-center mr-12">
				<div onClick={openModal} className="bg-blue-600 hover:bg-blue-400 rounded-full p-2 cursor-pointer">
					<BiPlus size={28} className="text-white " />
				</div>
			</div>
			<CreateLink reexecuteQuery={reexecuteQuery} isOpen={isOpen} closeModal={closeModal} />
		</Layout>
	);
}
