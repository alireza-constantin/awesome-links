import '../styles/tailwind.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import { Provider as GqlProvider } from 'urql';
import { client } from '../lib/urql';
import Layout from '../components/Layout';
import React from 'react';

function MyApp({ Component, pageProps, router }: AppProps<{ session: Session | null }>) {
	const LayoutWrapper = router.pathname === '/register' ? React.Fragment : Layout;

	if (pageProps.session === null) {
		router.push('/register');
	}

	return (
		<SessionProvider session={pageProps.session}>
			<GqlProvider value={client}>
				<LayoutWrapper>
					<Component {...pageProps} />
				</LayoutWrapper>
			</GqlProvider>
		</SessionProvider>
	);
}

export default MyApp;
