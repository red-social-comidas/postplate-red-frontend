import { Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { PostList } from "./components/post-list";
import { UserProfile } from "./components/user-profile";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export const Page = () => {
	return (
		<>
			<Row className="mt-2">
				<Col className="d-flex align-items-center gap-2">
					<Button as={Link} to="/" variant="link" size="sm">
						<ArrowLeftIcon
							style={{
								width: "24px",
								height: "24px",
							}}
						/>
					</Button>
					<p className="m-0 fs-5">Profile</p>
				</Col>
			</Row>
			<hr
				className="mt-2"
				style={{
					marginLeft: "-0.75rem",
					marginRight: "-0.75rem",
				}}
			></hr>
			<section>
				<UserProfile />
			</section>
			<hr
				style={{
					marginLeft: "-0.75rem",
					marginRight: "-0.75rem",
				}}
			></hr>
			<section>
				<PostList />
			</section>
		</>
	);
};
