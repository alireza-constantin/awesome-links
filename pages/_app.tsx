import '../styles/tailwind.css';
import Layout from '../components/Layout';
import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apollo';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ApolloProvider>
	);
}

export default MyApp;
