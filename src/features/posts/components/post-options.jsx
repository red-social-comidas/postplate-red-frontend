import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "sonner";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useGetProfile } from "@/features/auth";
import { useRemovePost } from "../queries";

const MODALS = {
	REMOVE: "remove",
};

export const PostOptions = ({ post }) => {
	const [modal, setModal] = useState("");

	const user = useGetProfile();
	const remove = useRemovePost();

	const handleRemove = () => {
		remove.mutate(post.id, {
			onSuccess() {
				setModal("");
				toast.success("Publicación eliminada");
			},
			onError(error) {
				toast.error(error.message);
			},
		});
	};

	return (
		<>
			{user.isSuccess ? (
				<>
					{user.data.id === post.id_user || user.data.role === "Admin" ? (
						<Button variant="danger" size="sm" onClick={() => setModal(MODALS.REMOVE)}>
							<TrashIcon
								style={{
									width: "18px",
									height: "18px",
								}}
							/>
						</Button>
					) : null}
				</>
			) : null}

			<Modal show={modal === MODALS.REMOVE} onHide={() => setModal("")} centered>
				<Modal.Header closeButton>
					<Modal.Title>Eliminar post?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Esta acción no se puede deshacer. Eliminará permanentemente la publicación y todo su contenido.
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setModal("")}>
						Cerrar
					</Button>
					<Button variant="danger" onClick={handleRemove} disabled={remove.isPending}>
						{remove.isPending ? "Eliminando..." : "Eliminar"}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
