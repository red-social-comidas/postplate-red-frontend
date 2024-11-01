import React from "react";
import "./Unete.css";
import socialfood from "../../../multimedia/comidas/social-food.webp";
import Tarjeta from "../tarjetas/tarjeta";

export const Unete = () => {
	const datos = {
		link: "/auth/register",
		titulo: "Unete a la red social de comida",
		parrafo:
			"Puedes elegir libremente tus platos favoritos, compartirlos y vincular con personas.",
		boton: "Registrarse",
		botonColor: "#FF7926",
		display: "none",
		colorTexto: "black",
		clase: "tarjeta-unete",
		bordes: "0",
	};
	return (
		<section className="container-unete">
			<article>
				<Tarjeta datos={datos} />
				<img src={socialfood} alt="" />
			</article>
		</section>
	);
};
