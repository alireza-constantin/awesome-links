import '../styles/tailwind.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import { Provider } from 'urql';
import { client } from '../lib/urql';

function MyApp({ Component, pageProps }: AppProps<{ session: Session | null }>) {
	return (
		<SessionProvider session={pageProps.session}>
			<Provider value={client}>
				<Component {...pageProps} />
			</Provider>
		</SessionProvider>
	);
}

export default MyApp;
