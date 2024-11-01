import React from "react";
import "./Tarjetas.css";
import Tarjeta from "./tarjeta";
import comida from "../../../multimedia/comidas/plato-tarjeta.webp";
import personas from "../../../multimedia/generales/personas-tarjeta.webp";
import social from "../../../multimedia/generales/publicaciones-tarjeta.webp";

export const Tarjetas = () => {
	const datosTarjetas = [
		{
			img: comida,
			titulo: "Descubre Tu Plato Ideal",
			parrafo: "¿Estás listo para encontrar tu nuevo plato favorito? Comparte tus recomendaciones y embárcate en una aventura de sabores.",
			fondo: "#FF7A45",
			clase: "tarjeta-tarjetas",
			bordes: "15px",
		},
		{
			img: personas,
			titulo: "Sabores Compartidos",
			parrafo: "Únete a nuestra comunidad y explora nuevos sabores.",
			fondo: "#31B77E",
			clase: "tarjeta-tarjetas",
			bordes: "15px",
		},
		{
			img: social,
			titulo: "Exprésate a Través de la Comida",
			parrafo:
				"Publica tus experiencias y encuentra personas que comparten tu pasión.",
			fondo: "#333740",
			clase: "tarjeta-tarjetas",
			bordes: "15px",
		},
	];
	return (
		<div className="container-tarjetas">
			{datosTarjetas.map((objeto, index) => (
				<Tarjeta datos={objeto} key={index} className="tarjeta-map" />
			))}
		</div>
	);
};
