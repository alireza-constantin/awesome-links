import '../styles/tailwind.css';
import Layout from '../components/Layout';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

function MyApp({ Component, pageProps }: AppProps<{ session: Session | null }>) {
	return (
		<SessionProvider session={pageProps.session}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SessionProvider>
	);
}

export default MyApp;
