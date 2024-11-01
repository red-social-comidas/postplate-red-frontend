import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userKeys } from "../users";
import { getNewTokens, getProfile, login, register, updateProfile } from "./api";
import { REFRESH_TOKEN_KEY } from "./constants";
import { useNavigate } from "react-router-dom";

export const authKeys = {
	key: () => ["auth"],
	tokens: () => [...authKeys.key(), "tokens"],
	profile: () => [...authKeys.key(), "profile"],
};

export const useAuth = () => {
	
	const { data, isPending, isError } = useQuery({
		queryKey: authKeys.tokens(),
		queryFn: getNewTokens,
	//	refetchInterval: 1000 * 60 * 30, // 30 minutes
	//	retryOnMount: false,
	});

	const refreshToken = data?.refresh;
	const accessToken = data?.access;


	const isAuthenticated = !! accessToken;

	useEffect(() => {
		
		if (refreshToken) {
			localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refreshToken]);

	return {
		refreshToken,
		accessToken,
		isAuthenticated,
		isPending,
		isError,
	};
};

export const useGetProfile = () => {
	const { accessToken } = useAuth();

	return useQuery({
		queryKey: authKeys.profile(),
		queryFn: () => getProfile(accessToken),
		enabled: !!accessToken,
	});
};

export const useLogin = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: login,
		onSuccess({ refresh, access }) {
			localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
			queryClient.setQueryData(authKeys.tokens(), { refresh, access });
		},
	});
};

export const useRegister = () => {
	return useMutation({
		mutationFn: register,
	});
};

export const useSignout = () => {
	const queryClient = useQueryClient();
    const navigate = useNavigate()

	return useMutation({
		mutationFn: () => Promise.resolve(),
		onSuccess() {
			localStorage.removeItem(REFRESH_TOKEN_KEY);
			queryClient.clear();
			navigate('/auth/login');
		},
	});
};

export const useUpdateProfile = () => {
	const queryClient = useQueryClient();
	const { accessToken } = useAuth();

	return useMutation({
		mutationFn: (values) => updateProfile(accessToken, values),
		onSuccess(response) {
			queryClient.setQueryData(authKeys.profile(), response);
			queryClient.setQueryData(userKeys.getByUsername(response.username), response);
			queryClient.setQueryData(userKeys.getById(response.id), response)
		},
	});
};
