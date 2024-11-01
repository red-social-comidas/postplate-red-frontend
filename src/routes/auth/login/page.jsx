import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { signinInitialValues, signinSchema, useLogin } from "@/features/auth";
import "../Auth.css";
import cebollin from "../../../multimedia/generales/cebollin-landing.png";
import hchica from "../../../multimedia/generales/hizquierda-landing.png";
import hgrande from "../../../multimedia/generales/hderecha-landing.png";
import pchico from "../../../multimedia/generales/platochico-landing.png";
import home from "../../../multimedia/SVGs/HOME.svg";

// import platoC from "../../../multimedia/generales/platochico-landing.png";
export const Page = () => {
	const navigate = useNavigate();

	const { mutate, isPending } = useLogin();

	const formik = useFormik({
		initialValues: signinInitialValues,
		validationSchema: signinSchema,
		onSubmit: (values) => {
			mutate(values, {
				onSuccess() {
					navigate("/");
				},
			});
		},
	});

	return (
		<Container
			className="d-flex justify-content-center align-items-center container-auth"
			style={{ minHeight: "100vh", height: "92vh", minWidth: "100vw" }}
		>
			<img src={cebollin} className="img-auth-login cebollin" />
			<img src={hchica} className="img-auth-login hoja-chica" />
			<img src={hgrande} className="img-auth-login hoja-grande" />
			<img src={pchico} className="img-auth-login p-chico" />
			<Link to="/">
				<img src={home} className="img-auth-login home" />
			</Link>

			<Row className="w-100">
				<Col
					md={6}
					lg={4}
					className="mx-auto form-iniciar-sesion"
					style={{ borderRadius: "10px", padding: "5vh", backgroundColor: "#F8F9FA" }}
				>
					<div className="mb-4 text-center">
						<h1>Inicia sesión</h1>
					</div>

					<Form onSubmit={formik.handleSubmit} noValidate className="d-grid gap-2">
						<Row>
							<Col>
								<Form.Group controlId="email">
									<Form.Label>Correo</Form.Label>
									<Form.Control
										{...formik.getFieldProps("email")}
										isInvalid={formik.touched.email && formik.errors.email}
									/>

									<Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
								</Form.Group>
							</Col>
						</Row>

						<Row>
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

						<div className="d-grid mt-2">
							<Button type="submit" size="lg" disabled={isPending}>
								Ingresar
							</Button>
						</div>
					</Form>

					<div className="mt-2">
						<p>
							¿No tienes cuenta? <Link to="/auth/register">Registrate</Link>
						</p>
					</div>
				</Col>
			</Row>
		</Container>
	);
};
