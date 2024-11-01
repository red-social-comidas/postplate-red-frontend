import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Image, Modal, Placeholder, Ratio, Row, Stack } from "react-bootstrap";
import { HTTP_STATUS } from "@/shared/utils";
import { useGetUserByUsername } from "@/features/users";
import { useGetProfile } from "@/features/auth";
import { useAcceptRequest, useGetFriends, useGetPending, useRemoveFriend, useSendRequest } from "@/features/friends";
import { EditProfile } from "./edit-profile";
import { PencilIcon } from "@heroicons/react/24/outline";

const MODALS = {
	VIEW_PROFILE: "view-profile",
	EDIT_PROFILE: "edit-profile",
};

export const UserProfile = () => {
	const [modals, setModals] = useState("");

	const { username } = useParams();

	const auth_user = useGetProfile();
	const user = useGetUserByUsername(username);

	const requests = useGetPending();
	const friends = useGetFriends();

	const accept = useAcceptRequest();

	const request = requests.data?.find((r) => r.id_user2 === auth_user.data?.id);
	const sent = requests.data?.find((r) => r.id_user1 === auth_user.data?.id);
	const friend = friends.data?.find((f) => [f.id_user1, f.id_user2].includes(auth_user.data?.id));

	const addFriend = useSendRequest();
	const removeFriend = useRemoveFriend();

	return user.isPending || auth_user.isPending || friends.isPending || requests.isPending ? (
		<Stack>
			<Placeholder style={{ width: "120px", height: "120px", borderRadius: "50%" }} />

			<Row className="mt-2">
				<Col>
					<Stack gap={1}>
						<Placeholder xs={5} size="lg" />
						<Placeholder xs={2} />
					</Stack>
				</Col>
				<Col className="text-end">
					<Placeholder.Button
						variant="primary"
						xs={3}
						style={{
							height: "32px",
						}}
					/>
				</Col>
			</Row>
		</Stack>
	) : user.isError ? (
		<div className="p-5 text-center text-secondary">
			<p className="m-0">{user.error.status === HTTP_STATUS.NOT_FOUND ? "User not found." : "Something went wrong."}</p>
		</div>
	) : (
		<>
			<Stack gap={3}>
				<Stack>
					<Ratio
						aspectRatio="1x1"
						style={{
							maxWidth: "120px",
							maxHeight: "120px",
						}}
						role="button"
						className="h-100 w-100"
						onClick={() => setModals(MODALS.VIEW_PROFILE)}
					>
						{user.data.images ? (
							<Image src={user.data.images} roundedCircle fluid className="object-fit-contain border" />
						) : (
							<div className="bg-secondary w-100 h-100 rounded-circle d-flex justify-content-center align-items-center">
								<span className="text-white fs-1 fw-bold">
									{[user.data.first_name, user.data.last_name].map((n) => n.charAt(0).toUpperCase()).join("")}
								</span>
							</div>
						)}
					</Ratio>
					<Row>
						<Col>
							<h2 className="mb-0">
								{user.data.first_name} {user.data.last_name}
							</h2>
							<p className="m-0 text-muted">@{user.data.username}</p>
						</Col>
						<Col className="text-end">
							{requests.isPending || friends.isPending || auth_user.isPending ? (
								<Placeholder.Button
									variant="primary"
									xs={3}
									style={{
										height: "32px",
									}}
								/>
							) : auth_user.data.username === username ? (
								<Button variant="primary" size="sm" onClick={() => setModals(MODALS.EDIT_PROFILE)}>
									<PencilIcon style={{ width: "14px", height: "14px" }} className="me-2" />
									Editar perfil
								</Button>
							) : request ? (
								<Button
									variant="primary"
									size="sm"
									disabled={accept.isPending}
									onClick={() => {
										accept.mutate(request.id);
									}}
								>
									{accept.isPending ? "..." : "Aceptar solicitud de amistad"}
								</Button>
							) : sent ? (
								<Button variant="secondary" size="sm" disabled>
									Solicitud enviada
								</Button>
							) : friend ? (
								<Button
									variant="danger"
									size="sm"
									onClick={() => removeFriend.mutate(friend.id)}
									disabled={removeFriend.isPending}
								>
									{removeFriend.isPending ? "..." : "Eliminar amigo"}
								</Button>
							) : (
								<Button
									variant="success"
									size="sm"
									onClick={() => {
										addFriend.mutate(user.data.id);
									}}
									disabled={addFriend.isPending}
								>
									{addFriend.isPending ? "..." : "Enviar solicitud"}
								</Button>
							)}
						</Col>
					</Row>
				</Stack>
			</Stack>

			<Modal show={modals === MODALS.VIEW_PROFILE} onHide={() => setModals("")} centered>
				<Modal.Header closeButton>
					<Modal.Title>
						{user.data.first_name} {user.data.last_name}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Ratio aspectRatio="1x1" className="h-100 w-100">
						{user.data.images ? (
							<Image src={user.data.images} roundedCircle fluid className="object-fit-contain border" />
						) : (
							<div className="bg-secondary w-100 h-100 rounded-circle d-flex justify-content-center align-items-center">
								<span className="text-white fs-1 fw-bold">
									{[user.data.first_name, user.data.last_name].map((n) => n.charAt(0).toUpperCase()).join("")}
								</span>
							</div>
						)}
					</Ratio>
				</Modal.Body>
			</Modal>

			{auth_user.isSuccess ? (
				<EditProfile show={modals === MODALS.EDIT_PROFILE} onHide={() => setModals("")} user={auth_user.data} />
			) : null}
		</>
	);
};
