import { Outlet, useLocation } from "react-router-dom";

export const Layout = () => {
	const location = useLocation();

	return <Outlet />;
};
