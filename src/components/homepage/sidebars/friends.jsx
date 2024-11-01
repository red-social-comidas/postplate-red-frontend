import React, { useEffect, useState } from "react"; // Importamos React y hooks
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; // Importamos hooks de react-query para manejar consultas y mutaciones
import { friendsApi, updateApiToken, setRefreshTokenCallback } from "./api"; // Importamos las funciones de la API
import { useAuth } from "@/features/auth"; // Importamos el contexto de autenticación

export const FriendRequests = () => {
	const { accessToken, refreshToken, onSignout } = useAuth(); // Extraemos los tokens y la función de cierre de sesión del contexto de autenticación
	const queryClient = useQueryClient(); // Creamos una instancia de queryClient para manejar la caché de consultas
	const [error, setError] = useState(null); // Estado para manejar errores
	const [searchQuery, setSearchQuery] = useState(""); // Estado para la consulta de búsqueda de amigos
	const [newFriendId, setNewFriendId] = useState(""); // Estado para el ID del nuevo amigo

	// Configuración del token
	useEffect(() => {
		updateApiToken(accessToken); // Actualizamos el token de la API cuando cambia el accessToken
	}, [accessToken]);

	// Configuración del token de refresco
	useEffect(() => {
		setRefreshTokenCallback(async () => {
			// Configuramos la función de callback para refrescar el token
			try {
				const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}/auth/refresh-token/`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ refresh: refreshToken }), // Enviamos el refreshToken para obtener un nuevo accessToken
				});

				if (!response.ok) throw new Error("Failed to refresh token"); // Lanza un error si la respuesta no es ok
				const data = await response.json(); // Convertimos la respuesta a JSON
				return data.access; // Retornamos el nuevo accessToken
			} catch (error) {
				onSignout(); // Si hay un error, cerramos sesión
				throw error; // Lanza el error
			}
		});
	}, [refreshToken, onSignout]); // Dependencias: refreshToken y onSignout

	// Consultas
	const { data: pendingRequests, isLoading: isPendingLoading } = useQuery({
		// Consultamos las solicitudes pendientes
		queryKey: ["pendingRequests"],
		queryFn: friendsApi.fetchPendingRequests, // Función para obtener solicitudes pendientes
		enabled: !!accessToken, // Solo se ejecuta si hay un accessToken
	});

	const { data: friends, isLoading: isFriendsLoading } = useQuery({
		// Consultamos la lista de amigos
		queryKey: ["friends"],
		queryFn: friendsApi.fetchFriends, // Función para obtener la lista de amigos
		enabled: !!accessToken, // Solo se ejecuta si hay un accessToken
	});

	// Mutaciones
	const sendRequestMutation = useMutation({
		// Mutación para enviar solicitudes de amistad
		mutationFn: friendsApi.sendFriendRequest,
		onSuccess: () => {
			// Se ejecuta si la mutación es exitosa
			queryClient.invalidateQueries(["pendingRequests"]); // Invalidamos la consulta de solicitudes pendientes
			setNewFriendId(""); // Reseteamos el ID del nuevo amigo
			setError(null); // Reseteamos el error
		},
		onError: (error) => setError(error.message), // Manejo de errores
	});

	const acceptMutation = useMutation({
		// Mutación para aceptar solicitudes de amistad
		mutationFn: friendsApi.acceptRequest,
		onSuccess: () => {
			// Se ejecuta si la mutación es exitosa
			queryClient.invalidateQueries(["pendingRequests"]); // Invalidamos la consulta de solicitudes pendientes
			queryClient.invalidateQueries(["friends"]); // Invalidamos la consulta de amigos
			setError(null); // Reseteamos el error
		},
		onError: (error) => setError(error.message), // Manejo de errores
	});

	const declineMutation = useMutation({
		// Mutación para rechazar solicitudes de amistad
		mutationFn: friendsApi.declineRequest,
		onSuccess: () => {
			// Se ejecuta si la mutación es exitosa
			queryClient.invalidateQueries(["pendingRequests"]); // Invalidamos la consulta de solicitudes pendientes
			setError(null); // Reseteamos el error
		},
		onError: (error) => setError(error.message), // Manejo de errores
	});

	// Manejador para enviar solicitudes de amistad
	const handleSendRequest = (e) => {
		e.preventDefault(); // Prevenimos el comportamiento predeterminado del formulario
		if (newFriendId.trim()) {
			// Verificamos que el ID no esté vacío
			sendRequestMutation.mutate(newFriendId); // Llamamos a la mutación para enviar la solicitud
		}
	};

	// Filtramos amigos de forma segura
	const filteredFriends = // Filtramos amigos según la consulta de búsqueda
		friends?.filter((friend) => friend?.state?.toLowerCase().includes(searchQuery.toLowerCase())) || [];

	// Aseguramos que pendingRequests sea siempre un array
	const safePendingRequests = pendingRequests || []; // Si pendingRequests es undefined, asignamos un array vacío

	return (
		<div className="space-y-6 p-4">
			{" "}
			{/* Contenedor principal */}
			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">{error}</div>
			)}{" "}
			{/* Mensaje de error */}
			{/* Sección para enviar solicitud de amistad */}
			<div className="bg-white rounded-lg shadow">
				<div className="p-4 border-b">
					<h3 className="text-lg font-semibold">Enviar solicitud de amistad</h3> {/* Título de la sección */}
				</div>
				<div className="p-4">
					<form onSubmit={handleSendRequest} className="flex gap-2">
						{" "}
						{/* Formulario para enviar solicitudes */}
						<input
							value={newFriendId} // Valor del input controlado
							onChange={(e) => setNewFriendId(e.target.value)} // Actualiza el estado del nuevo amigo
							placeholder="ID del usuario" // Placeholder del input
							className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" // Estilos del input
						/>
						<button
							type="submit" // Botón de envío
							disabled={sendRequestMutation.isPending} // Deshabilitado si la mutación está en proceso
							className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50" // Estilos del botón
						>
							Enviar
						</button>
					</form>
				</div>
			</div>
			{/* Sección para solicitudes pendientes */}
			<div className="bg-white rounded-lg shadow">
				<div className="p-4 border-b">
					<h3 className="text-lg font-semibold">Solicitudes Pendientes</h3> {/* Título de la sección */}
				</div>
				<div className="p-4">
					{isPendingLoading ? ( // Verificamos si se están cargando las solicitudes
						<p>Cargando solicitudes...</p> // Mensaje de carga
					) : safePendingRequests.length === 0 ? ( // Si no hay solicitudes pendientes
						<p className="text-gray-500">No hay solicitudes pendientes</p> // Mensaje de no hay solicitudes
					) : (
						<ul className="space-y-2">
							{" "}
							{/* Lista de solicitudes pendientes */}
							{safePendingRequests.map(
								(
									request, // Iteramos sobre las solicitudes
								) => (
									<li
										key={request?.id || Math.random()}
										className="flex items-center justify-between p-2 border rounded"
									>
										{" "}
										{/* Elemento de lista */}
										<span>{request?.id_user2}</span> {/* Mostrar ID del usuario en la solicitud */}
										<div className="flex gap-2">
											{" "}
											{/* Contenedor para botones */}
											<button
												onClick={() => request?.id && acceptMutation.mutate(request.id)} // Aceptar solicitud
												disabled={acceptMutation.isPending} // Deshabilitado si la mutación está en proceso
												className="px-3 py-1 text-sm border rounded hover:bg-gray-50" // Estilos del botón
											>
												Aceptar
											</button>
											<button
												onClick={() => request?.id && declineMutation.mutate(request.id)} // Rechazar solicitud
												disabled={declineMutation.isPending} // Deshabilitado si la mutación está en proceso
												className="px-3 py-1 text-sm border rounded hover:bg-gray-50" // Estilos del botón
											>
												Rechazar
											</button>
										</div>
									</li>
								),
							)}
						</ul>
					)}
				</div>
			</div>
			{/* Sección para la lista de amigos */}
			<div className="bg-white rounded-lg shadow">
				<div className="p-4 border-b">
					<h3 className="text-lg font-semibold">Lista de Amigos</h3> {/* Título de la sección */}
					<input
						value={searchQuery} // Valor del input controlado
						onChange={(e) => setSearchQuery(e.target.value)} // Actualiza el estado de búsqueda
						placeholder="Buscar amigos..." // Placeholder del input
						className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" // Estilos del input
					/>
				</div>
				<div className="p-4">
					{isFriendsLoading ? ( // Verificamos si se están cargando los amigos
						<p>Cargando amigos...</p> // Mensaje de carga
					) : filteredFriends.length === 0 ? ( // Si no hay amigos filtrados
						<p className="text-gray-500">No tienes amigos</p> // Mensaje de no hay amigos
					) : (
						<ul className="space-y-2">
							{" "}
							{/* Lista de amigos */}
							{filteredFriends.map(
								(
									friend, // Iteramos sobre la lista de amigos filtrados
								) => (
									<li key={friend?.id} className="border p-2 rounded">
										{" "}
										{/* Elemento de lista */}
										{friend?.id_user2} {/* Mostrar ID del amigo */}
									</li>
								),
							)}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};
