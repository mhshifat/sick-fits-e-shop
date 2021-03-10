import { useEffect, useState } from "react";

const useForm = (initialValues = {}) => {
	const [inputs, setInputs] = useState(initialValues);

	useEffect(() => {
		setInputs(initialValues);
	}, [Object.values(initialValues).join("")]);

	const handleChange = (e) => {
		let { name, value, type } = e.target;
		if (type === "number") value = parseInt(value);
		if (type === "file") [value] = e.target.files;
		setInputs((allInputs) => ({
			...allInputs,
			[name]: value,
		}));
	};

	const resetForm = () => {
		setInputs(initialValues);
	};

	const clearForm = () => {
		const blankState = Object.fromEntries(
			Object.entries(inputs).map(([key]) => [key, ""])
		);
		setInputs(blankState);
	};

	return { inputs, handleChange, resetForm, clearForm };
};

export default useForm;
