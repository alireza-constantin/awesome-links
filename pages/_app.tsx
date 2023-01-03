import '../styles/tailwind.css';
import type { AppProps } from 'next/app';
import { SessionProvider, useSession } from 'next-auth/react';
import type { Session } from 'next-auth';
import { Provider } from 'urql';
import { client } from '../lib/urql';
import Layout from '../components/Layout';
import React from 'react';

function MyApp({ Component, pageProps, router }: AppProps<{ session: Session | null }>) {
	const LayoutWrapper = router.pathname === '/register' ? React.Fragment : Layout;

	return (
		<SessionProvider session={pageProps.session}>
			<Provider value={client}>
				<LayoutWrapper>
					<Component {...pageProps} />
				</LayoutWrapper>
			</Provider>
		</SessionProvider>
	);
}

export default MyApp;
