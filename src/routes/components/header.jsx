import { Link } from "react-router-dom";
import { Button, Container, Dropdown, Image, Navbar, Ratio } from "react-bootstrap";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useAuth, useGetProfile, useSignout } from "@/features/auth";
import user from "../../multimedia/SVGs/USER.svg";

export const Header = () => {
	const { isAuthenticated, isPending } = useAuth();

	const profile = useGetProfile();

	const signout = useSignout();

	const handleSignout = () => {
		signout.mutate(null);
	};

	return (
		<Navbar
			style={{
				position: "sticky",
				top: 0,
				zIndex: 1000,
			}}
			expand="lg"
			className="bg-body-tertiary border-bottom"
		>
			<Container as="header">
				<Navbar.Brand as={Link} style={{ color: "orangered" }} className="font-bolder m-0 p-0 fw-medium">
					Post Plate
				</Navbar.Brand>
				{isPending ? (
					"Loading..."
				) : isAuthenticated ? (
					<>
						<Navbar.Toggle />
						<Navbar.Collapse className="justify-content-end">
							<Dropdown>
								<Dropdown.Toggle className="d-flex d-flex justify-content-center align-items-center">
									{profile.isPending ? (
										<p className="m-0">...</p>
									) : profile.isError ? (
										<ExclamationTriangleIcon style={{ width: "20px", height: "20px" }} className="text-white" />
									) : profile.data.images ? (
										<Ratio
											aspectRatio="1x1"
											style={{
												width: "2rem",
												height: "2rem",
											}}
										>
											<Image src={profile.data.images} roundedCircle fluid className="object-fit-contain border" />
										</Ratio>
									) : (
										<div className="w-100 h-100 d-flex justify-content-center align-items-center">
											<span className="text-white fs-6 fw-bold">
												{[profile.data.first_name, profile.data.last_name]
													.map((n) => n.charAt(0).toUpperCase())
													.join("")}
											</span>
										</div>
									)}
								</Dropdown.Toggle>

								<Dropdown.Menu align="end">
									<Dropdown.ItemText as="div">
										<p className="lh-1 m-0 fw-bold">
											{profile.data?.first_name} {profile.data?.last_name}
										</p>
										<small className="lh-1 text-muted">@{profile.data?.username}</small>
									</Dropdown.ItemText>
									<Dropdown.Divider />
									<Dropdown.Item as={Link} to={"/" + profile.data?.username}>
										Perfil
									</Dropdown.Item>
									<Dropdown.Divider />
									<Dropdown.Item as="button" onClick={handleSignout} disabled={signout.isPending}>
										{signout.isPending ? "Cerrando sesión..." : "Cerrar sesión"}
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</Navbar.Collapse>
					</>
				) : (
					<Button
						variant="link"
						as={Link}
						to="/auth/login"
						style={{ textDecoration: "none", color: "orangered", display: "flex" }}
						className="login-btn"
					>
						<img src={user} />
						Iniciar Sesión
					</Button>
				)}
			</Container>
		</Navbar>
	);
};
