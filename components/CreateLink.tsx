import React, { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LinkSchema } from '../types/schema';
import z from 'zod';
import { useMutation } from 'urql';
import { Link } from '../types/types';
import { Modal } from './modal';

type InputType = z.infer<typeof LinkSchema>;

const CreateLinkMutation = `#graphql
mutation($input: LinkInput!) {
	createLink(input: $input) {
	  userId
	  url
	  title
	  imageUrl
	  id
	  description
	  category
	}
  }
  `;

const fields = ['title', 'description', 'url', 'imageUrl', 'category'] as const;
type PropType = { isOpen: boolean; closeModal: () => void };

export const CreateLink: FC<PropType> = ({ isOpen, closeModal }) => {
	const [_, createLink] = useMutation<Link, { input: InputType }>(CreateLinkMutation);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<InputType>({
		resolver: zodResolver(LinkSchema),
	});

	const onSubmit = async (data: InputType) => {
		const res = await createLink({
			input: {
				...data,
			},
		});
		reset();
		if (res.error) {
			const errors = res.error.graphQLErrors[0].extensions;
			console.log(errors);
		} else {
			closeModal();
		}
	};

	return (
		<Modal title="Create A Link" isOpen={isOpen} closeModal={closeModal}>
			<form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-8">
					{fields.map((field) => (
						<FormGroup key={field} name={field} error={errors[field]?.message} register={register(field)} />
					))}
					<button
						type="submit"
						className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-500 hover:text-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
					>
						Create
					</button>
				</div>
			</form>
		</Modal>
	);
};

type formGroupPropType = {
	error?: string;
	name: string;
	register: any;
};

const FormGroup: React.FC<formGroupPropType> = ({ error, name, register }) => {
	return (
		<div className="relative">
			<input
				{...register}
				placeholder={name}
				className="peer w-full form-input rounded-md border-gray-300 text-gray-700 placeholder:text-gray-400 placeholder:text-transparent"
			/>
			<label className="absolute left-2 -top-3 text-gray-600 bg-white px-1 font-semibold text-sm capitalize  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal transition-all ">
				{name}
			</label>
			<p className="mt-1 text-sm text-red-500/75">{error}</p>
		</div>
	);
};
