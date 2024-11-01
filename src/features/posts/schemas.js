import { mixed, object, string } from "yup";

const content = string().label("Content").default("");

export const postSchema = object({
	content,
	files: mixed()
		.label("Files")
		.test("is-valid-type", "Tipo de imágenes válidas jpg, jpeg, png, gif", (files) => {
			const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

			return Array.from(files).every((file) => SUPPORTED_FORMATS.includes(file.type));
		})
		.test("is-valid-size", "Tamaño limite superado (Max 2MB)", (files) => {
			const MAX_SIZE = 1024 * 1024 * 2; // 2MB

			return Array.from(files).every((file) => file.size <= MAX_SIZE);
		})
		.default([]),
});

export const postInitialValues = postSchema.getDefault();
