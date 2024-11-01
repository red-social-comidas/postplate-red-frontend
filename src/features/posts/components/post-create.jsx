import { useState } from "react";
import { Button, Carousel, Col, Form, Image, Ratio, Row } from "react-bootstrap";
import { useFormik } from "formik";
import { PhotoIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCreatePost } from "../queries";
import { postInitialValues, postSchema } from "../schemas";
import { toast } from "sonner";

const MAX_UPLOAD_FILES = 10;

export const PostCreate = () => {
	const [idx, setIdx] = useState(0);
	const { mutate, isPending } = useCreatePost();

	const formik = useFormik({
		initialValues: postInitialValues,
		validationSchema: postSchema,
		onSubmit: (values) => {
			const formData = new FormData();
			formData.append("content", values.content);
			values.files.forEach((file) => {
				formData.append("files[]", file);
			});

			mutate(formData, {
				onSuccess() {
					formik.resetForm();
					toast.success("Publicación creada exitosamente");
				},
				onError(error) {
					toast.error(error.message);
				},
			});
		},
		validateOnBlur: false,
		validateOnChange: false,
	});

	const handleFileChange = (event) => {
		const countCurrentFiles = formik.values.files.length;
		const countNewFiles = event.currentTarget.files.length;
		const nextCountFiles = countCurrentFiles + countNewFiles;
		if (nextCountFiles <= MAX_UPLOAD_FILES) {
			formik.setFieldValue("files", [...formik.values.files, ...event.currentTarget.files]);
		}
	};

	const handleRemoveFile = (index) => {
		formik.setFieldValue(
			"files",
			formik.values.files.filter((_, i) => i !== index),
		);
		setIdx(index === 0 ? 0 : index - 1);
	};

	const isMaxUploadFiles = formik.values.files.length >= MAX_UPLOAD_FILES;

	return (
		<Form onSubmit={formik.handleSubmit} noValidate>
			<Row>
				<Col>
					<Form.Group controlId="content">
						<Form.Control
							{...formik.getFieldProps("content")}
							as="textarea"
							rows={4}
							isInvalid={formik.touched.content && formik.errors.content}
							placeholder="Publicación"
							disabled={isPending}
						/>
						<Form.Control.Feedback type="invalid">{formik.errors.content}</Form.Control.Feedback>
					</Form.Group>
				</Col>
			</Row>

			{formik.values.files.length > 0 ? (
				<Row className="mt-2">
					<Col>
						<Carousel activeIndex={idx} onSelect={(index) => setIdx(index)} wrap={false}>
							{formik.values.files.map((file, index) => (
								<Carousel.Item key={index}>
									<Ratio aspectRatio="16x9">
										<Image src={URL.createObjectURL(file)} thumbnail fluid className="object-fit-contain" />
									</Ratio>
									<Carousel.Caption>
										<Button variant="danger" onClick={() => handleRemoveFile(index)}>
											<TrashIcon
												style={{
													width: "24px",
													height: "24px",
												}}
											/>
										</Button>
									</Carousel.Caption>
								</Carousel.Item>
							))}
						</Carousel>
					</Col>
				</Row>
			) : null}

			<Row className="mt-2">
				<Col>
					<Form.Group controlId="files">
						<Form.Label
							className="btn btn-outline-primary m-0 d-flex align-items-center"
							style={{
								width: "fit-content",
							}}
						>
							<PhotoIcon
								style={{
									width: "24px",
									height: "24px",
								}}
								className="me-2"
							/>
							<span className="fs-6">Subir imágenes</span>
						</Form.Label>
						<Form.Control
							{...formik.getFieldProps("files")}
							onChange={handleFileChange}
							value=""
							type="file"
							accept="image/*"
							isInvalid={formik.touched.files && formik.errors.files}
							disabled={isPending || isMaxUploadFiles}
							multiple
							hidden
						/>
						<Form.Control.Feedback type="invalid">{formik.errors.files}</Form.Control.Feedback>
					</Form.Group>
				</Col>

				<Col className="text-end">
					<Button
						variant="success"
						type="submit"
						disabled={isPending || (!formik.values.content && !formik.values.files.length)}
					>
						{isPending ? "Publicando..." : "Publicar"}
					</Button>
				</Col>
			</Row>
		</Form>
	);
};
