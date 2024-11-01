import { ScrollRestoration, useLocation } from 'react-router-dom';
import { Stack } from "react-bootstrap";
import { Header } from "./components/header";
import { Content } from "./components/content";



export const Layout = () => {

	return (
		<Stack className="h-100">
			<Header />
			<Content/>
			<ScrollRestoration/> 
		</Stack>
	);
};
