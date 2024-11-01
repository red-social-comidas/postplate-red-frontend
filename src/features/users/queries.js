import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authKeys, useAuth } from "../auth";
import { getById, getByUsername } from "./api";

export const userKeys = {
	key: () => ["users"],
	getById: (id) => [...userKeys.key(), "get-by-id", id],
	getByUsername: (username) => [...userKeys.key(), "get-by-username", username],
};

export const useGetUserById = (id) => {
	const { accessToken } = useAuth();

	return useQuery({
		queryKey: userKeys.getById(id),
		queryFn: () => getById(accessToken, id),
		enabled: !!accessToken || !id,
	});
};

export const useGetUserByUsername = (username) => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();

	return useQuery({
		queryKey: userKeys.getByUsername(username),
		queryFn: () => getByUsername(accessToken, username),
		initialData: () => {
			const user = queryClient.getQueryData(authKeys.profile());

			return user?.username === username ? user : undefined;
		},
		enabled: !!accessToken,
	});
};
