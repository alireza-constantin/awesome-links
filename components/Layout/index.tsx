import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import Header from './Header';

type LayoutPropType = {
	children: ReactNode;
	fav: boolean;
	setFav: Dispatch<SetStateAction<boolean>>;
};

const Layout: FC<LayoutPropType> = ({ children, fav, setFav }) => {
	return (
		<div>
			<Header fav={fav} setFav={setFav} />
			{children}
		</div>
	);
};

export default Layout;
