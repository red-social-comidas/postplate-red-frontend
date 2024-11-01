import React from "react";
import "./Hero.css";
import burger from "../../multimedia/generales/burger-landing.png";
import servilleta from "../../multimedia/generales/servilleta-landing.png";
import grande from "../../multimedia/generales/platogrande-landing.png";
import chico from "../../multimedia/generales/platochico-landing.png";
import cebollin from "../../multimedia/generales/cebollin-landing.png";
import izquierda from "../../multimedia/generales/hizquierda-landing.png";
import derecha from "../../multimedia/generales/hderecha-landing.png";

export default function Hero() {
	return (
		<div className="container-hero">
			
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				backgroundColor: '#ffb164', // Fondo oscuro para resaltar el texto
			}}>
				<h1 style={{
					fontFamily: 'Lobster, cursive',
					fontSize: '5rem', // Aumenté el tamaño para más impacto
					color: 'linear-gradient(to right, #ff416c, #ff4b2b)', // Degradado
					background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
					WebkitBackgroundClip: 'text', // Para aplicar el degradado solo al texto
					WebkitTextFillColor: 'transparent', // Para hacer el texto transparente y ver el degradado
					fontWeight: 'bold',
					marginBottom: '15px', // Espacio entre el título y el eslogan
					textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', // Sombra para profundidad
				}}>
					PostPlate
				</h1>
				<h2 style={{
					fontFamily: 'Poppins, sans-serif', // Fuente diferente para contraste
					fontSize: '2.5rem', // Tamaño aumentado para mayor legibilidad
					color: '#f2f2f2', // Color claro para el eslogan
					fontWeight: '400',
					margin: '0',
					textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', // Sombra suave para el eslogan
				}}>
					Sabores que conectan
				</h2>
			</div>


			<img className="pngs-landing burger" src={burger} alt="" />
			<img className="pngs-landing plato-grande" src={grande} alt="" />
			<img className="pngs-landing servilleta" src={servilleta} alt="" />
			<img className="pngs-landing plato-chico" src={chico} alt="" />
			<img className="pngs-landing cebollin" src={cebollin} alt="" />
			<img className="pngs-landing hoja-izquierda" src={izquierda} alt="" />
			<img className="pngs-landing hoja-derecha" src={derecha} alt="" />
		</div>
	);
}
