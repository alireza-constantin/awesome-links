import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import Header from './Header';

type LayoutPropType = {
	children: ReactNode;
};

const Layout: FC<LayoutPropType> = ({ children }) => {
	return (
		<div>
			<Header />
			{children}
		</div>
	);
};

export default Layout;
