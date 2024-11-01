import { Stack } from "react-bootstrap";
import { PostItem, PostSkeleton, useGetFeed } from "@/features/posts";

export const PostsFeed = () => {
	const { data, isPending, isError } = useGetFeed();

	return isPending ? (
		<Stack gap={2}>
			{new Array(3).fill(0).map((_, index) => (
				<PostSkeleton key={index} />
			))}
		</Stack>
	) : isError ? (
		<div>
			<p>Error</p>
		</div>
	) : data.length === 0 ? (
		<div className="py-5 text-center text-secondary">
			<p>No posts yet</p>
		</div>
	) : (
		<Stack gap={3}>
			{data.map((post) => (
				<PostItem key={post.id} post={post} />
			))}
			{/* TODO: when there are no more posts, display a message */}
			<div className="py-5 text-center text-secondary">
				<p>You are up to date.</p>
			</div>
		</Stack>
	);
};
