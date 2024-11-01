import { Card, Col, Placeholder, Row } from "react-bootstrap";

export const PostSkeleton = () => {
	return (
		<Card>
			<Card.Header>
				<Placeholder animation="glow">
					<Placeholder xs={4} />
				</Placeholder>
			</Card.Header>
			<Card.Body>
				<Placeholder animation="glow">
					<Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
					<Placeholder xs={8} />
				</Placeholder>
			</Card.Body>
			<Card.Footer>
				<Row>
					{new Array(3).fill(0).map((_, index) => (
						<Col key={index}>
							<Placeholder animation="glow">
								<Placeholder xs={12} />
							</Placeholder>
						</Col>
					))}
				</Row>
			</Card.Footer>
		</Card>
	);
};
