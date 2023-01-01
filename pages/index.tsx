import Layout from '../components/Layout';
import { Link } from '../types/types';

import { useQuery } from 'urql';
import { AwesomeLink } from '../components/AwesomeLink';
import { BiPlus } from 'react-icons/bi';
import { useState } from 'react';
import { CreateLink } from '../components/CreateLink';

const LinksQuery = `
  query {
    links {
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

	const [result, reexecuteQuery] = useQuery({
		query: LinksQuery,
	});

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	return (
		<Layout>
			<div className="container mx-auto max-w-5xl my-20">
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
						/>
					))}
				</ul>
			</div>
			<div className="sticky bottom-10 flex justify-end items-center mr-12">
				<div onClick={openModal} className="bg-blue-600 hover:bg-blue-400 rounded-full p-2 cursor-pointer">
					<BiPlus size={28} className="text-white " />
				</div>
			</div>
			<CreateLink isOpen={isOpen} closeModal={closeModal} />
		</Layout>
	);
}
