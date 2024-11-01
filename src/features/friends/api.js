import { BASE_API_URL } from "@/config";
import { fetcher } from "@/shared/utils";

// export const getRequests = (accessToken) => {
// 	return fetcher(`${BASE_API_URL}/api/friends/`, {
// 		method: "GET",
// 		headers: {
// 			"Content-Type": "application/json",
// 			Authorization: `Bearer ${accessToken}`,
// 		},
// 	});
// };

export const getFriends = (accessToken) => {
	return fetcher(`${BASE_API_URL}/api/friends/list_friends/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const getPending = (accessToken) => {
	return fetcher(`${BASE_API_URL}/api/friends/pending/`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const sendRequest = (accessToken, id_user1, id_user2) => {
	return fetcher(`${BASE_API_URL}/api/friends/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({
			id_user1,
			id_user2,
		}),
	});
};

export const acceptRequest = (accessToken, id) => {
	return fetcher(`${BASE_API_URL}/api/friends/${id}/accept/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const declineRequest = (accessToken, id) => {
	return fetcher(`${BASE_API_URL}/api/friends/${id}/decline/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

export const removeFriend = (accessToken, id) => {
	return fetcher(`${BASE_API_URL}/api/friends/${id}/`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
};
