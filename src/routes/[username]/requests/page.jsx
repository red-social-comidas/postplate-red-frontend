import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Button, Col, Image, Ratio, Row, Stack, Tab, Tabs } from "react-bootstrap";
import { toast } from "sonner";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useGetUserById, useGetUserByUsername } from "@/features/users";
import { useAcceptRequest, useGetPending, useDeclineRequest } from "@/features/friends";
import { useGetProfile } from "@/features/auth";

const PendingItem = ({ request }) => {
	const { data: user, isPending, isError } = useGetUserById(request.id_user1);

	const accept = useAcceptRequest();
	const reject = useDeclineRequest();

	const handleAccept = () => {
		accept.mutate(request.id, {
			onSuccess() {
				toast.success("Friend request accepted");
			},
		});
	};
	const handleDecline = () => {
		reject.mutate(request.id, {
			onSuccess() {
				toast.success("Friend request declined");
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
				<Button
					variant="primary"
					size="sm"
					onClick={handleAccept}
					disabled={accept.isPending || reject.isPending}
					className="me-2"
				>
					{accept.isPending ? "Accepting..." : "Accept"}
				</Button>
				<Button variant="danger" size="sm" onClick={handleDecline} disabled={reject.isPending || accept.isPending}>
					{reject.isPending ? "Rejecting..." : "Reject"}
				</Button>
			</Col>
		</Row>
	);
};

const SendItem = ({ request }) => {
	const { data: user, isPending, isError } = useGetUserById(request.id_user2);

	return isPending ? (
		<div className="text-muted">Loading...</div>
	) : isError ? (
		<div className="text-danger">Error</div>
	) : (
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
	);
};

export const Page = () => {
	const { username } = useParams();
	const navigate = useNavigate();

	const auth_user = useGetProfile();
	const user = useGetUserByUsername(username);
	const { data: requests, isPending, isError, error } = useGetPending();

	const pending = requests?.filter((r) => r.id_user2 === user.data?.id);
	const sent = requests?.filter((r) => r.id_user1 === user.data?.id);

	return isPending || auth_user.isPending ? (
		<div className="py-5 text-center text-muted">
			<p className="m-0">Loading...</p>
		</div>
	) : isError ? (
		<div className="py-5 text-center text-danger">
			<p>Error</p>
			<pre>{JSON.stringify(error, null, 2)}</pre>
		</div>
	) : auth_user.data.username !== username ? (
		<Navigate to={`/${username}`} />
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
				activeKey="requests"
				className="pt-2"
				onSelect={(tab) => {
					navigate(`/${user.data?.username}/${tab}`);
				}}
				style={{
					marginLeft: "-0.75rem",
					marginRight: "-0.75rem",
				}}
			>
				<Tab eventKey="requests" title="Solicitudes" />
				<Tab eventKey="friends" title="Amigos" />
			</Tabs>

			<Stack as="section" gap={5} className="mt-3">
				<Stack gap={2}>
					<br/>
					<hr/>
					<h5>Pendientes</h5>

					<Stack gap={2}>
						{pending.length === 0 ? (
							<div className="text-muted text-center">No tienes solicitudes de amistad pendientes.</div>
						) : (
							pending.map((r) => <PendingItem key={r.id} request={r} />)
						)}
					</Stack>
				</Stack>

				<Stack gap={2}>
					<hr/>
					<h5>Enviados</h5>

					<Stack gap={3}>
						{sent.length === 0 ? (
							<div className="text-muted text-center">No has enviado ninguna solicitud.</div>
						) : (
							sent.map((r) => <SendItem key={r.id} request={r} />)
						)}
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};
