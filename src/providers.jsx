import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { queryClient } from "./shared/libs";
import { Routes } from "./router";

export const Providers = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Routes />
			<Toaster richColors />
			<ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
		</QueryClientProvider>
	);
};
