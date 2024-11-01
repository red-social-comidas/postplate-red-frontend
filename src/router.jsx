import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RedirectAuthenticated } from "./shared/components";
import * as Home from "./routes";
import * as Login from "./routes/auth/login";
import * as Register from "./routes/auth/register";
import * as Profile from "./routes/[username]";
import { Solicitudes } from "./pages/solicitudes";
import { Comidas } from "./pages/comidas";
import { Amistades } from "./pages/amistades";
import { FriendRequests } from "./components/homepage/sidebars/friends";
import * as Friends from "./routes/[username]/friends";
import * as Requests from "./routes/[username]/requests";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home.Layout />,
		children: [
			{
				index: true,
				element: <Home.Page />,
			},
			{
				path: ":username",
				element: <Profile.Layout />,
				children: [
					{
						index: true,
						element: <Profile.Page />,
					},
					{
						path: "requests",
						element: <Requests.Page />,
					},
					{
						path: "friends",
						element: <Friends.Page />,
					},
				],
			},
			{
				path: "/solicitudes",
				element: <Solicitudes />,
			},
			{
				path: "/comidas",
				element: <Comidas />,
			},
			{
				path: "/amistades",
				element: <Amistades />,
			},
		],
	},
	{
		path: "/auth/login",
		element: (
			<RedirectAuthenticated>
				<Login.Page />
			</RedirectAuthenticated>
		),
	},
	{
		path: "/auth/register",
		element: (
			<RedirectAuthenticated>
				<Register.Page />
			</RedirectAuthenticated>
		),
	},
	/* Eliminar cuando se termine el sidebar */
	{
		path: "/friends/requests",
		element: <FriendRequests />,
	},
]);

export const Routes = () => {
	return <RouterProvider router={router} />;
};
