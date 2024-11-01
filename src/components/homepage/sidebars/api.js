// Importamos Axios para hacer solicitudes HTTP
import axios from "axios";

// Creamos una instancia de Axios con la URL base definida en las variables de entorno
const api = axios.create({
	baseURL: import.meta.env.VITE_BASE_API_URL, // URL base de la API
});

// Función para actualizar el token de autorización en los encabezados de las solicitudes
export const updateApiToken = (token) => {
	if (token) {
		// Si hay un token, lo agregamos a los encabezados de autorización
		api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		// Si no hay token, eliminamos el encabezado de autorización
		delete api.defaults.headers.common["Authorization"];
	}
};

// Variable para almacenar un callback de refresco de token
let refreshTokenCallback = null;

// Función para establecer un callback que se ejecutará al refrescar el token
export const setRefreshTokenCallback = (callback) => {
	refreshTokenCallback = callback; // Guardamos el callback para su uso posterior
};

// Interceptor de respuestas de Axios para manejar errores globalmente
api.interceptors.response.use(
	(response) => response, // Si la respuesta es exitosa, simplemente la devolvemos
	async (error) => {
		const originalRequest = error.config; // Guardamos la configuración de la solicitud original
		// Si hay un error 401 (no autorizado) y no hemos reintentado la solicitud
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true; // Marcamos la solicitud como reintentada

			if (refreshTokenCallback) {
				try {
					// Intentamos refrescar el token utilizando el callback establecido
					const newAccessToken = await refreshTokenCallback();
					if (newAccessToken) {
						// Si obtenemos un nuevo token, lo actualizamos en los encabezados
						updateApiToken(newAccessToken);
						originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
						// Reintentamos la solicitud original con el nuevo token
						return api(originalRequest);
					}
				} catch (error) {
					// Si falla el refresco del token, redirigimos al usuario a la página de inicio de sesión
					window.location.href = "/auth/login";
					return Promise.reject(error); // Rechazamos la promesa con el error
				}
			}
		}
		// Si no es un error 401 o no se puede refrescar el token, rechazamos la promesa con el error
		return Promise.reject(error);
	},
);

// API de amigos que contiene funciones para interactuar con la API de amigos
export const friendsApi = {
	// Obtener todas las solicitudes de amistad
	fetchAllRequests: async () => {
		try {
			const response = await api.get("/api/friends/"); // Hacemos una solicitud GET
			console.log("Solicitudes: ");
			console.log(response);
			return response.data; // Retornamos los datos de la respuesta
		} catch (error) {
			// Si hay un error, lanzamos un nuevo error con un mensaje descriptivo
			throw new Error(error.response?.data?.message || "Error al obtener las solicitudes");
		}
	},

	// Obtener solicitudes pendientes
	fetchPendingRequests: async () => {
		try {
			const response = await api.get("/api/friends/pending/"); // Hacemos una solicitud GET para solicitudes pendientes
			console.log("Solicitudes pendientes: ");
			console.log(response);
			return response.data; // Retornamos los datos de la respuesta
		} catch (error) {
			// Manejo de errores similar al anterior
			throw new Error(error.response?.data?.message || "Error al obtener las solicitudes pendientes");
		}
	},

	// Crear nueva solicitud de amistad
	sendFriendRequest: async (userId) => {
		try {
			const response = await api.post("/api/friends/", { id_user2: userId }); // Hacemos una solicitud POST con el ID del usuario
			return response.data; // Retornamos los datos de la respuesta
		} catch (error) {
			// Manejo de errores
			throw new Error(error.response?.data?.message || "Error al enviar la solicitud de amistad");
		}
	},

	// Aceptar solicitud de amistad
	acceptRequest: async (id) => {
		try {
			const response = await api.post(`/api/friends/${id}/accept/`); // Hacemos una solicitud POST para aceptar la solicitud
			return response.data; // Retornamos los datos de la respuesta
		} catch (error) {
			// Manejo de errores
			throw new Error(error.response?.data?.message || "Error al aceptar la solicitud");
		}
	},

	// Rechazar solicitud de amistad
	declineRequest: async (id) => {
		try {
			const response = await api.post(`/api/friends/${id}/decline/`); // Hacemos una solicitud POST para rechazar la solicitud
			return response.data; // Retornamos los datos de la respuesta
		} catch (error) {
			// Manejo de errores
			throw new Error(error.response?.data?.message || "Error al rechazar la solicitud");
		}
	},

	// Obtener lista de amigos
	fetchFriends: async () => {
		try {
			const response = await api.get("/api/friends/list_friends/"); // Hacemos una solicitud GET para obtener la lista de amigos
			console.log("Amigos: ");
			console.log(response);
			return response.data; // Retornamos los datos de la respuesta
		} catch (error) {
			// Manejo de errores
			throw new Error(error.response?.data?.message || "Error al obtener la lista de amigos");
		}
	},
};
