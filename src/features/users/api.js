import { BASE_API_URL } from "@/config";
import { fetcher } from "@/shared/utils";

export const getById = (accessToken, id) => {
	return fetcher(`${BASE_API_URL}/api/auth/${id}/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const getByUsername = (accessToken, username) => {
	return fetcher(`${BASE_API_URL}/api/auth/by-username/${username}/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};
