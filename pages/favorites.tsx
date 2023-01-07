import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useQuery } from 'urql';
import { AwesomeLink } from '../components/AwesomeLink';
import { Link } from '../types/types';

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

export default function Favorites() {
	const router = useRouter();
	const { status } = useSession();

	const pauseQuery = status === 'unauthenticated' || status === 'loading';

	const [result, reexecuteQuery] = useQuery({
		query: LinksQuery,
		pause: pauseQuery,
		variables: {
			favorite: true,
		},
	});

	console.log('route', router);

	return (
		<div className="container h-screen mx-auto max-w-5xl my-12">
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
		</div>
	);
}
