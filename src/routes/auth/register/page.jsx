import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { signupInitialValues, signupSchema, useRegister } from "@/features/auth";
import "../Auth.css";
import platoG from "../../../multimedia/generales/platogrande-landing.png";
import platoC from "../../../multimedia/generales/platochico-landing.png";
import home from "../../../multimedia/SVGs/HOME.svg";

export const Page = () => {
	const navigate = useNavigate();
	const { mutate, isPending } = useRegister();

	const formik = useFormik({
		initialValues: signupInitialValues,
		validationSchema: signupSchema,
		onSubmit: (values) => {
			mutate(values, {
				onSuccess() {
					navigate("/auth/login");
				},
			});
		},
	});

	return (
		<Container
			className="d-flex justify-content-center align-items-center container-auth"
			style={{ minHeight: "100vh", minWidth: "100vw" }}
		>
			<img src={platoG} className="img-auth-login platoG-registro " />
			<img src={platoC} className="img-auth-login platoC-registro" />
			<Link to="/">
				<img src={home} className="img-auth-login home" />
			</Link>
			<Row className="w-100">
				<Col
					md={6}
					lg={6}
					className="mx-auto"
					style={{ borderRadius: "10px", padding: "5vh", backgroundColor: "#F8F9FA", zIndex: "5000" }}
				>
					<div className="mb-4">
						<h1>Registro</h1>
					</div>

					<Form onSubmit={formik.handleSubmit} noValidate className="d-grid gap-2">
						<Row>
							<Col>
								<Form.Group controlId="username">
									<Form.Label>Usuario</Form.Label>
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
									<Form.Label>Nombre</Form.Label>
									<Form.Control
										{...formik.getFieldProps("first_name")}
										isInvalid={formik.touched.first_name && formik.errors.first_name}
									/>
									<Form.Control.Feedback type="invalid">{formik.errors.first_name}</Form.Control.Feedback>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId="last_name">
									<Form.Label>Apellido</Form.Label>
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
							<Col>
								<Form.Group controlId="password">
									<Form.Label>Contraseña</Form.Label>
									<Form.Control
										{...formik.getFieldProps("password")}
										type="password"
										isInvalid={formik.touched.password && formik.errors.password}
									/>

									<Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Group controlId="password2">
									<Form.Label>Confirmar contraseña</Form.Label>
									<Form.Control
										{...formik.getFieldProps("password2")}
										type="password"
										isInvalid={formik.touched.password2 && formik.errors.password2}
									/>

									<Form.Control.Feedback type="invalid">{formik.errors.password2}</Form.Control.Feedback>
								</Form.Group>
							</Col>
						</Row>

						<div className="d-grid mt-2">
							<Button type="submit" size="lg" disabled={isPending}>
								Registrate
							</Button>
						</div>
					</Form>

					<div className="mt-2">
						<p>
							¿Ya tienes una cuenta? <Link to="/auth/login">Ingresa</Link>
						</p>
					</div>
				</Col>
			</Row>
		</Container>
	);
};
