import { PostCreate } from "@/features/posts";
import { PostsFeed } from "./components/posts-feed";

export const Page = () => {
	return (
		<>
			<div className="mt-3"></div>
			<PostCreate />
			<hr
				style={{
					marginLeft: "-0.75rem",
					marginRight: "-0.75rem",
				}}
			></hr>
			<PostsFeed />
		</>
	);
};
