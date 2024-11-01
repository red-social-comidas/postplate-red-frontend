// import { useNavigate } from "react-router-dom";
import { Card, CardHeader, Col, Row } from "react-bootstrap";
import { PostGallery } from "./post-gallery";
import { PostOptions } from "./post-options";
import { PostUserProfile } from "./post-user-profile";

export const PostItem = ({ post }) => {
	// const navigate = useNavigate();

	// const handleBody = (event) => {
	// 	const targets = ["card-body", "card-text"];
	// 	if (targets.some((target) => event.target.classList.contains(target))) {
	// 		// navigate(`posts/${post.id}`);
	// 		alert("#TODO: Navigate to post");
	// 	}
	// };

	return (
		<Card key={post.id}>
			<CardHeader>
				<Row>
					<Col xs={10}>
						<PostUserProfile post={post} />
					</Col>
					<Col xs={2} className="text-end">
						<PostOptions post={post} />
					</Col>
				</Row>
			</CardHeader>
			<Card.Body role="button">
				<Card.Text as="pre">{post.content}</Card.Text>
				<PostGallery files={post.files_set} />
			</Card.Body>
			<Card.Footer>
				<small className="text-muted">
					{new Intl.DateTimeFormat("en-US", {
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
					}).format(new Date(post.publication_date))}
				</small>
			</Card.Footer>
		</Card>
	);
};
