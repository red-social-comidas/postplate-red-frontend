import { useParams } from "react-router-dom";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { authKeys, useAuth } from "../auth";
import { create, getFeed, getPosts, getOneUser, remove } from "./api";

export const postKeys = {
	key: () => ["posts"],
	feed: () => [...postKeys.key(), "feed"],
	byUsername: (username) => [...postKeys.key(), "by-username", username],
	getOne: (id) => [...postKeys.key(), "get-one", id],
};

export const useGetFeed = () => {
	const { accessToken } = useAuth();

	return useQuery({
		queryKey: postKeys.feed(),
		queryFn: () => getFeed(accessToken),
		enabled: !!accessToken,
	});
};

export const useGetPosts = (username) => {
	const { accessToken } = useAuth();

	return useQuery({
		queryKey: postKeys.byUsername(username),
		queryFn: () => getPosts(accessToken, username),
		enabled: !!accessToken,
	});
};

export const useGetPost = () => {
	const { id } = useParams();

	const { accessToken } = useAuth();

	return useQuery({
		queryKey: postKeys.getOne(id),
		queryFn: () => getOneUser(id),
		enabled: accessToken && id,
	});
};

export const useCreatePost = () => {
	const queryClient = useQueryClient();

	const { accessToken } = useAuth();

	return useMutation({
		mutationFn: (values) => create(accessToken, values),
		onSuccess: () => {
			const profile = queryClient.getQueryData(authKeys.profile());

			queryClient.invalidateQueries({
				queryKey: postKeys.feed(),
			});
			queryClient.invalidateQueries({
				queryKey: postKeys.byUsername(profile.username),
			});
		},
	});
};

export const useRemovePost = () => {
	const queryClient = useQueryClient();

	const { accessToken } = useAuth();

	return useMutation({
		mutationFn: (id) => remove(accessToken, id),
		onSuccess: () => {
			const profile = queryClient.getQueryData(authKeys.profile());

			queryClient.invalidateQueries({
				queryKey: postKeys.feed(),
			});
			queryClient.invalidateQueries({
				queryKey: postKeys.byUsername(profile.username),
			});
		},
	});
};
