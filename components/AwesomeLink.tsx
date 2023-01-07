import React, { useState } from 'react';
import { useMutation } from 'urql';
import { FiExternalLink, FiArchive } from 'react-icons/fi';
import { Modal } from './modal';

const DeleteLinkMutation = `#graphql
	mutation ($id: String!) {
		deleteLink(id: $id){
			id
		}
	}
`;

type PropType = {
	imageUrl: string;
	url: string;
	title: string;
	category: string;
	description: string;
	id: string;
};

export const AwesomeLink: React.FC<PropType> = ({ imageUrl, url, title, category, description, id }) => {
	const [_, deleteLink] = useMutation<boolean, { id: string }>(DeleteLinkMutation);

	const [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	async function onDelete() {
		try {
			await deleteLink({ id });
			closeModal();
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<li className="shadow  max-w-md mx-auto  rounded">
			<img src={imageUrl} className="aspect-auto" />
			<div className="p-5 flex flex-col space-y-2">
				<div className="flex justify-between items-center">
					<p className="text-sm text-blue-500">{category}</p>
					<FiArchive size={20} onClick={openModal} className="text-red-400 cursor-pointer" />
				</div>
				<p className="text-lg font-medium">{title}</p>
				<p className="text-gray-600">{description}</p>
				<a href={url} target="_blank" className="flex justify-between hover:text-blue-500">
					<p>{url.replace(/(^\w+:|^)\/\//, '')}</p>
					<FiExternalLink size={20} className="w-10 min-w-fit" />
				</a>
			</div>
			<Modal isOpen={isOpen} closeModal={closeModal} title="Are you sure you want to delete?">
				<div className="flex justify-between items-center w-full gap-2 mt-6">
					<button onClick={closeModal} className="bg-green-400 text-white font-semibold flex-1 py-2 rounded-lg">
						No
					</button>
					<button onClick={onDelete} className="bg-red-400 text-white font-semibold flex-1 py-2 rounded-lg">
						Yes
					</button>
				</div>
			</Modal>
		</li>
	);
};
