import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/features/auth";

export const RedirectAuthenticated = ({ children, to = "/" }) => {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return <main className="d-flex justify-content-center align-items-center">Loading...</main>;
	}

	return isAuthenticated ? <Navigate to={to} /> : children ? children : <Outlet />;
};
