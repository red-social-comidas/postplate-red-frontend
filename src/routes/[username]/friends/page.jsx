import { Link, useNavigate, useParams } from "react-router-dom";
import { Badge, Button, Col, Image, Ratio, Row, Stack, Tab, Tabs } from "react-bootstrap";
import { toast } from "sonner";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useGetFriends, useRemoveFriend } from "@/features/friends";
import { useGetUserById, useGetUserByUsername } from "@/features/users";
import { useGetProfile } from "@/features/auth";

const Friend = ({ request }) => {
	const auth_user = useGetProfile();
	const {
		data: user,
		isPending,
		isError,
	} = useGetUserById(auth_user.data?.id === request.id_user1 ? request.id_user2 : request.id_user1);

	const remove = useRemoveFriend();

	const handleRemove = () => {
		remove.mutate(request.id, {
			onSuccess() {
				toast.success("Amigo eliminado");
			},
		});
	};

	return isPending ? (
		<div className="text-muted">Loading...</div>
	) : isError ? (
		<div className="text-danger">Error</div>
	) : (
		<Row>
			<Col>
				<Link to={`/${user.username}`}>
					<div className="d-flex gap-2">
						<Ratio
							aspectRatio="1x1"
							style={{
								maxWidth: "36px",
								maxHeight: "36px",
							}}
							role="button"
						>
							{user.images ? (
								<Image src={user.images} roundedCircle fluid className="object-fit-contain border h-100 w-100" />
							) : (
								<div className="bg-secondary w-100 h-100 rounded-circle d-flex justify-content-center align-items-center">
									<span className="text-white fs-6 fw-bold">
										{[user.first_name, user.last_name].map((n) => n.charAt(0).toUpperCase()).join("")}
									</span>
								</div>
							)}
						</Ratio>
						<div className="d-flex flex-column justify-content-center">
							<span className="fw-bold lh-1">{[user.first_name, user.last_name].join(" ")}</span>
							<small className="text-muted">@{user.username}</small>
						</div>
					</div>
				</Link>
			</Col>
			<Col className="text-end">
				<Button variant="danger" size="sm" onClick={handleRemove} disabled={isPending}>
					{remove.isPending ? "Eliminando..." : "Eliminar"}
				</Button>
			</Col>
		</Row>
	);
};

export const Page = () => {
	const { username } = useParams();
	const navigate = useNavigate();

	const auth_user = useGetProfile();
	const user = useGetUserByUsername(username);
	const { data: friends, isPending, isError, error } = useGetFriends();

	return isPending || auth_user.isPending ? (
		<div className="py-5 text-center text-muted">
			<p className="m-0">Loading...</p>
		</div>
	) : isError ? (
		<div className="py-5 text-center text-danger">
			<p>Error</p>
			<pre>{JSON.stringify(error, null, 2)}</pre>
		</div>
	) : (
		<Stack>
			<Row className="py-2 border-bottom">
				<Col className="d-flex align-items-center gap-2">
					<Button as={Link} to={`/${user.data?.username}`} variant="link" size="sm">
						<ArrowLeftIcon
							style={{
								width: "24px",
								height: "24px",
							}}
						/>
					</Button>
					{user.isPending ? (
						"Loading..."
					) : user.isError ? (
						"Error"
					) : (
						<div className="d-flex flex-column justify-content-center">
							<span className="fw-bold lh-1">{[user.data.first_name, user.data.last_name].join(" ")}</span>
							<small className="text-muted">@{user.data.username}</small>
						</div>
					)}
				</Col>
			</Row>

			<Tabs
				activeKey="friends"
				className="pt-2"
				onSelect={(tab) => {
					navigate(`/${user.data?.username}/${tab}`);
				}}
				style={{
					marginLeft: "-0.75rem",
					marginRight: "-0.75rem",
				}}
			>
				{auth_user.data?.username === username ? <Tab eventKey="requests" title="Solicitudes" /> : null}
				<Tab eventKey="friends" title="Amigos" />
			</Tabs>

			<Stack as="section" gap={2} className="mt-3">
				<h5>
					Lista{" "}
					<Badge bg="secondary" className="ms-2">
						{friends.length}
					</Badge>
				</h5>

				<Stack gap={3}>
					{friends.length === 0 ? (
						<div className="text-muted text-center">No tienes amigos agregados.</div>
					) : (
						friends.map((r) => <Friend key={r.id} request={r} />)
					)}
				</Stack>
			</Stack>
		</Stack>
	);
};
