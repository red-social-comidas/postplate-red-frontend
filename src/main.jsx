import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/global.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
