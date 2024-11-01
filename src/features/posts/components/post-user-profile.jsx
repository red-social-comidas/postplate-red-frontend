import { Image, Placeholder, Ratio, Stack } from "react-bootstrap";
import { useGetUserById } from "@/features/users";

export const PostUserProfile = ({ post }) => {
	const { data: author, isPending, isError } = useGetUserById(post.id_user);

	return isPending ? (
		<div className="d-flex align-items-center gap-2">
			<Placeholder
				style={{
					width: "36px",
					height: "36px",
					borderRadius: "50%",
				}}
			/>
			<Stack gap={1}>
				<Placeholder xs={4} />
				<Placeholder xs={2} />
			</Stack>
		</div>
	) : isError ? (
		<div className="fs-5 text-muted">
			<p className="m-0">Error</p>
		</div>
	) : (
		<Stack
			as="a"
			href={author.username}
			direction="horizontal"
			gap={2}
			className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
		>
			{author.images ? (
				<Ratio
					aspectRatio="1x1"
					style={{
						width: "2.5rem",
						height: "2.5rem",
					}}
				>
					<Image src={author.images} roundedCircle fluid className="w-100 h-100 object-fit-contain border" />
				</Ratio>
			) : (
				<div
					style={{
						width: "36px",
						height: "36px",
					}}
					className="bg-secondary rounded-circle d-flex justify-content-center align-items-center"
				>
					<span className="text-white fs-6 fw-bold">
						{[author.first_name, author.last_name].map((n) => n.charAt(0).toUpperCase()).join("")}
					</span>
				</div>
			)}
			<Stack>
				<strong className="lh-1 link-underline-opacity-0">{`${author.first_name} ${author.last_name}`}</strong>
				<p className="text-secondary lh-sm m-0 link-underline-opacity-0">@{author.username}</p>
			</Stack>
		</Stack>
	);
};
