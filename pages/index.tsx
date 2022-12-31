import { useQuery } from 'urql';
import { AwesomeLink } from '../components/AwesomeLink';
import Layout from '../components/Layout';

const TodosQuery = `
  query {
    hello
  }
`;

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

type Link = {
	id: string;
	title: string;
	url: string;
	imageUrl: string;
	description: string;
	category: string;
};

export default function Home() {
	const [result, reexecuteQuery] = useQuery({
		query: LinksQuery,
	});

	return (
		<Layout>
			<div className="container mx-auto max-w-5xl my-20">
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					{result?.data?.links.map((link: Link) => (
						<AwesomeLink
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
		</Layout>
	);
}
