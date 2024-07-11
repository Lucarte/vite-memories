import { useFetchers, useNavigation } from "react-router-dom";
import Tailspin from "../components/Tailspin";

type Props = {
	children: React.ReactElement;
};

const LoadingLayout = ({ children }: Props) => {
	const navigation = useNavigation();
	const fetchers = useFetchers();

	let isLoading = false;

	if (navigation.state === "loading") {
		isLoading = true;
	}

	fetchers.map((fetcher) => {
		fetcher.state === "loading" ? (isLoading = true) : null;
	});

	return (
		<>
			{isLoading ? (
				<div className='fixed -translate-x-1/2 top-24 left-1/2'>
					<Tailspin />
				</div>
			) : null}

			{children}
		</>
	);
};

export default LoadingLayout;
