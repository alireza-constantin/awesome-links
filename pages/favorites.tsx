import { useRouter } from 'next/router';

export default function Favorites() {
	const router = useRouter();

	console.log('route', router);

	return <div> Hello </div>;
}
