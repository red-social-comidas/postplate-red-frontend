import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth, useGetProfile } from "../auth";
import { acceptRequest, getFriends, getPending, declineRequest, sendRequest, removeFriend } from "./api";

export const friendKeys = {
	key: () => ["friends"],
	requests: () => [...friendKeys.key(), "requests"],
	pending: () => [...friendKeys.key(), "pending"],
	list: () => [...friendKeys.key(), "list"],
};

// export const useGetRequests = () => {
// 	const { accessToken } = useAuth();

// 	return useQuery({
// 		queryKey: friendKeys.requests(),
// 		queryFn: () => getRequests(accessToken),
// 	});
// };

export const useGetFriends = () => {
	const { accessToken } = useAuth();

	return useQuery({
		queryKey: friendKeys.list(),
		queryFn: () => getFriends(accessToken),
	});
};

export const useGetPending = () => {
	const { accessToken } = useAuth();

	return useQuery({
		queryKey: friendKeys.pending(),
		queryFn: () => getPending(accessToken),
	});
};

export const useSendRequest = () => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();
	const { data: user } = useGetProfile();

	return useMutation({
		mutationFn: (id_user2) => sendRequest(accessToken, user?.id, id_user2),
		onSuccess(values) {
			queryClient.setQueryData(friendKeys.pending(), (old) => {
				if (!old) return [values];
				return [values, ...old];
			});
		},
	});
};

export const useAcceptRequest = () => {
	const queryClient = useQueryClient();

	const { accessToken } = useAuth();

	return useMutation({
		mutationFn: (id) => acceptRequest(accessToken, id),
		onSuccess(_, id) {
			queryClient.setQueryData(friendKeys.pending(), (old) => {
				return old.filter((r) => r.id !== id);
			});
		},
	});
};

export const useDeclineRequest = () => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();

	return useMutation({
		mutationFn: (id) => declineRequest(accessToken, id),
		onSuccess(_, id) {
			queryClient.setQueryData(friendKeys.pending(), (old) => {
				return old.filter((r) => r.id !== id);
			});
		},
	});
};

export const useRemoveFriend = () => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();

	return useMutation({
		mutationFn: (id) => removeFriend(accessToken, id),
		onSuccess(_, id) {
			queryClient.setQueryData(friendKeys.list(), (old) => {
				return old.filter((r) => r.id !== id);
			});
		},
	});
};
