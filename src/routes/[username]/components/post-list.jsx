import { useParams } from "react-router-dom";
import { Stack } from "react-bootstrap";
import { PostItem, PostSkeleton, useGetPosts } from "@/features/posts";
import { HTTP_STATUS } from "@/shared/utils";

export const PostList = () => {
	const { username } = useParams();

	const { data, isPending, isError, error } = useGetPosts(username);

	return isPending ? (
		<Stack gap={3}>
			{new Array(3).fill(0).map((_, index) => (
				<PostSkeleton key={index} />
			))}
		</Stack>
	) : isError ? (
		<div className="py-5 text-center text-secondary">
			<p className="m-0">{error.status === HTTP_STATUS.NOT_FOUND ? "No posts found." : "Something went wrong."}</p>
		</div>
	) : data.length === 0 ? (
		<div className="py-5 text-center text-secondary">
			<p className="m-0">No posts yet.</p>
		</div>
	) : (
		<Stack gap={3}>
			{data.map((post) => (
				<PostItem key={post.id} post={post} />
			))}
			{/* TODO: when there are no more posts, display a message */}
			<div className="py-5 text-center text-secondary">
				<p className="m-0">You are up to date.</p>
			</div>
		</Stack>
	);
};
