import { Link, NavLink } from "react-router-dom";
import { Badge, Stack } from "react-bootstrap";
import { HomeIcon, UserGroupIcon, UserIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { useGetProfile } from "@/features/auth";
import { useGetFriends, useGetPending } from "@/features/friends";

export const Leftsidebar = () => {
	const profile = useGetProfile();
	const requests = useGetPending();
	const friends = useGetFriends();

	const username = profile.data?.username;

	return (
		<Stack
			style={{
				gap: "70px",
			}}
			className="justify-content-center h-100 position-fixed"
		>
			{[
				{
					to: "/",
					label: "Inicio",
					icon: HomeIcon,
				},
				{
					to: `/${username}/requests`,
					label: "Solicitudes",
					icon: UserPlusIcon,
					badge: {
						content: requests.data?.length ?? "...",
					},
				},
				{
					to: `/${username}/friends`,
					label: "Amigos",
					icon: UserGroupIcon,
					badge: {
						content: friends.data?.length ?? "...",
					},
				},
				{
					to: `/${username}`,
					label: "Perfil",
					icon: UserIcon,
				},
			].map(({ to, label, icon: Icon, badge }) => (
				<NavLink
					key={to}
					as = {Link}
					to={to}
					style={{
						color: "orangered",
						display: "flex",
						alignItems: "center",
					}}
				>
					<Icon
						style={{
							width: "28px",
							height: "28px",
							margin: "0 10px",
							strokeWidth: "2px",
						}}
					/>
					<span className="fs-5 fw-black fw-medium">{label}</span>

					{badge && (
						<Badge bg="secondary" className="ms-2">
							{badge.content}
						</Badge>
					)}
				</NavLink>
			))}
		</Stack>
	);
};
