import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardText from "react-bootstrap/CardText";
import { Link } from "react-router-dom";
import "./Tarjetas.css";
function Tarjeta({ datos }) {
	return (
		<Card
			style={{
				width: "22rem",
				height: "90%",
				overflow: "hidden",
				backgroundColor: datos.fondo,
				borderRadius: datos.bordes,
				color: "#FFFFFF",
				zIndex: "5000",
			}}
			border="light"
			className={datos.clase}
		>
			<Card.Body className="d-flex flex-column align-items-center justify-content-center" style={{ padding: "50px" }}>
				<Card.Title style={{ color: datos.colorTexto, fontSize: "2.2rem", textAlign: "center" }}>
					{datos.titulo}
				</Card.Title>
				<Card.Text style={{ color: datos.colorTexto, fontSize: "1.02rem", textAlign: "center" }}>
					{datos.parrafo}
				</Card.Text>
				<Card.Link as={Link} className="links-tarjeta" style={{ backgroundColor: datos.botonColor }} to={datos.link}>
					{datos.boton}
				</Card.Link>
			</Card.Body>
			<Card.Img
				variant="top"
				src={datos.img}
				style={{ display: datos.display, zIndex: "4000" }}
				className="hover-tarjetas"
			/>
		</Card>
	);
}

export default Tarjeta;
