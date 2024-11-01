import { BASE_API_URL } from "@/config";
import { fetcher } from "@/shared/utils";

export const getFeed = (accessToken) => {
	return fetcher(`${BASE_API_URL}/api/posts/feed/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const getPosts = (accessToken, username) => {
	return fetcher(`${BASE_API_URL}/api/posts/by-username/user/${username}/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const getOneUser = (accessToken, id) => {
	return fetcher(`${BASE_API_URL}/api/posts/user-publications/${id}/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const create = (accessToken, values) => {
	return fetcher(`${BASE_API_URL}/api/posts/user-publications/`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		body: values,
	});
};

export const remove = (accessToken, id) => {
	return fetcher(`${BASE_API_URL}/api/posts/user-publications/${id}/`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};
