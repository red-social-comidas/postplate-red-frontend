import { mixed, object, ref, string } from "yup";

const username = string().label("Username").required("Usuario requerido").default("");
const first_name = string().label("First Name").required("Nombre requerido").default("");
const last_name = string().label("Last Name").required("Apellido requerido").default("");
const email = string().label("Email").email().required("Correo requerido").default("");
const password = string().label("Password").min(8, "La contraseña debe tener al menos 8 caracteres").required("Contraseña requerida").default("");
const images = mixed()
	.label("Profile")
	.test("is-valid-type", "Foto de perfil no válida", (file) => {
		if (file instanceof File) {
			const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
			return SUPPORTED_FORMATS.includes(file.type);
		}

		return true;
	})
	.test("is-valid-size", "File too large", (file) => {
		if (file instanceof File) {
			const MAX_SIZE = 1024 * 1024 * 2; // 2MB

			return file.size <= MAX_SIZE;
		}

		return true;
	})
	.nullable()
	.default(null);

export const signinSchema = object({
	email,
	password,
});

export const signinInitialValues = signinSchema.getDefault();

export const signupSchema = object({
	first_name,
	last_name,
	email,
	password,
	password2: string()
		.label("Confirm Password")
		.oneOf([ref("password")], "Las contraseñas deben coincidir.")
		.required("Confirmar la contraseña")
		.default(""),
});

export const signupInitialValues = signupSchema.getDefault();

export const editProfileSchema = object({
	username,
	first_name,
	last_name,
	email,
	images,
});
