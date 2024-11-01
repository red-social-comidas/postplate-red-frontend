import { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form, Image, Modal, Ratio, Row } from "react-bootstrap";
import { toast } from "sonner";
import { editProfileSchema, useGetProfile, useUpdateProfile } from "@/features/auth";
import { TrashIcon } from "@heroicons/react/24/outline";

export const EditProfile = ({ show, onHide }) => {
	const { username } = useParams();
	const navigate = useNavigate();

	const user = useGetProfile();

	const { mutate, isPending } = useUpdateProfile();

	const formik = useFormik({
		initialValues: {
			username: user.data?.username,
			first_name: user.data?.first_name,
			last_name: user.data?.last_name,
			email: user.data?.email,
			images: user.data?.images,
		},
		validationSchema: editProfileSchema,
		onSubmit: (values) => {
			if (typeof values.images === "string") delete values.images;

			const formData = new FormData();
			Object.entries(values).forEach(([key, value]) => {
				formData.append(key, value);
			});

			mutate(formData, {
				onSuccess(data) {
					if (username !== data.username) navigate(`/${data.username}`, { replace: true });
					onHide();
				},
				onError(err) {
					toast.error(JSON.stringify(err));
				},
			});
		},
		enableReinitialize: true,
	});

	console.log(formik.values.images)
	useEffect(() => {
		if (show) {
			formik.resetForm();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [show]);

	return (
		<Modal show={show} onHide={onHide} centered>
			<Form onSubmit={formik.handleSubmit} noValidate>
				<Modal.Header closeButton>
					<Modal.Title>Edit Profile</Modal.Title>
				</Modal.Header>
				<Modal.Body className="d-grid gap-3">
					<Row>
						<Col>
							<Form.Group controlId="images">
								<Form.Label className="d-flex justify-content-center align-items-center" role="button">
									<Ratio
										style={{
											maxWidth: "120px",
											maxHeight: "120px",
										}}
										aspectRatio="1x1"
										className="h-100 w-100"
									>
										{formik.values.images ? (
											<Image
												src={
													formik.values.images instanceof File
														? URL.createObjectURL(formik.values.images)
														: formik.values.images
												}
												roundedCircle
												fluid
												className="object-fit-contain border"
											/>
										) : (
											<div
												style={{
													maxWidth: "120px",
													maxHeight: "120px",
												}}
												className="bg-secondary rounded-circle d-flex justify-content-center align-items-center"
											>
												<span className="text-white fs-1 fw-bold">
													{[user.data?.first_name, user.data?.last_name].map((n) => n.charAt(0).toUpperCase()).join("")}
												</span>
											</div>
										)}
									</Ratio>
								</Form.Label>
								<Form.Control
									{...formik.getFieldProps("images")}
									type="file"
									onChange={(event) => formik.setFieldValue("images", event.currentTarget.files[0])}
									value=""
									accept="image/*"
									hidden
									disabled={isPending}
									isInvalid={formik.touched.images && formik.errors.images}
								/>
								<Form.Control.Feedback type="invalid">{formik.errors.images}</Form.Control.Feedback>
							</Form.Group>
							<div className="text-center">
								{formik.values.images ? (
									<Button variant="danger" onClick={() => formik.setFieldValue("images", null)}>
										<TrashIcon
											style={{
												width: "1.5em",
												height: "1.5em",
											}}
										/>
									</Button>
								) : null}
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group controlId="username">
								<Form.Label>Username</Form.Label>
								<Form.Control
									{...formik.getFieldProps("username")}
									isInvalid={formik.touched.username && formik.errors.username}
								/>
								<Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group controlId="first_name">
								<Form.Label>First Name</Form.Label>
								<Form.Control
									{...formik.getFieldProps("first_name")}
									isInvalid={formik.touched.first_name && formik.errors.first_name}
								/>
								<Form.Control.Feedback type="invalid">{formik.errors.first_name}</Form.Control.Feedback>
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="last_name">
								<Form.Label>Last Name</Form.Label>
								<Form.Control
									{...formik.getFieldProps("last_name")}
									isInvalid={formik.touched.last_name && formik.errors.last_name}
								/>
								<Form.Control.Feedback type="invalid">{formik.errors.last_name}</Form.Control.Feedback>
							</Form.Group>
						</Col>
					</Row>

					<Row>
						<Col>
							<Form.Group controlId="email">
								<Form.Label>Email</Form.Label>
								<Form.Control
									{...formik.getFieldProps("email")}
									isInvalid={formik.touched.email && formik.errors.email}
								/>

								<Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
							</Form.Group>
						</Col>
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={onHide}>
						Close
					</Button>
					<Button type="submit" variant="primary" disabled={isPending || !formik.dirty}>
						{isPending ? "Saving..." : "Save"}
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};
