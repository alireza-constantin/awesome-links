import { Transition, Dialog } from '@headlessui/react';
import { Fragment, FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LinkSchema } from '../types/schema';
import z from 'zod';

type PropType = { isOpen: boolean; closeModal: () => void };
const labelClasses =
	'absolute left-2 -top-3 text-gray-600 bg-white px-1 font-semibold text-sm capitalize  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-placeholder-shown:font-normal transition-all ';

type InputType = z.infer<typeof LinkSchema>;

export const CreateLink: FC<PropType> = ({ isOpen, closeModal }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<InputType>({
		resolver: zodResolver(LinkSchema),
	});

	const onSubmit = (data: InputType) => console.log(data);

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={closeModal}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-600 text-center">
									CREATE A LINK
								</Dialog.Title>
								<form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
									<div className="flex flex-col gap-8">
										<div className="relative">
											<input
												{...register('title')}
												placeholder="Title"
												className="peer w-full form-input rounded-md border-gray-300 text-gray-700 placeholder:text-gray-400
												 placeholder:text-transparent"
											/>
											<label className={labelClasses}>title</label>
											<p className="mt-1 text-sm text-red-500/75">{errors.title?.message}</p>
										</div>
										<div className="relative ">
											<input
												{...register('description')}
												placeholder="Title"
												className="peer w-full form-input rounded-md border-gray-300 text-gray-700 placeholder:text-gray-400
												 placeholder:text-transparent"
											/>
											<label className={labelClasses}>description</label>
											<p className="mt-1 text-sm text-red-500/75">{errors.description?.message}</p>
										</div>
										<div className="relative">
											<input
												{...register('url')}
												placeholder="Title"
												className="peer w-full form-input rounded-md border-gray-300 text-gray-700 placeholder:text-gray-400
												 placeholder:text-transparent"
											/>
											<label className={labelClasses}>URL</label>
											<p className="mt-1 text-sm text-red-500/75">{errors.url?.message}</p>
										</div>
										<div className="relative">
											<input
												{...register('imageUrl')}
												placeholder="Title"
												className="peer w-full form-input rounded-md border-gray-300 text-gray-700 placeholder:text-gray-400
												 placeholder:text-transparent"
											/>
											<label className={labelClasses}>image URL</label>
											<p className="mt-1 text-sm text-red-500/75">{errors.imageUrl?.message}</p>
										</div>
										<div className="relative">
											<input
												{...register('category')}
												placeholder="category"
												className="peer w-full form-input rounded-md border-gray-300 text-gray-700 placeholder:text-gray-400
												 placeholder:text-transparent"
											/>
											<label className={labelClasses}>category</label>
											<p className="mt-1 text-sm text-red-500/75">{errors.category?.message}</p>
										</div>
										<button
											type="submit"
											className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-500 hover:text-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
										>
											Create
										</button>
									</div>
								</form>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};
