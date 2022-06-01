// import TextField from "@mui/material/TextField";
import api from "../../services/api";
import { useState } from "react";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const SignupPage = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		email: "",
		password: "",
		name: "",
		ascCode: "",
	});

	function handleChange(event) {
		setForm({ ...form, [event.target.name]: event.target.value });
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(form);
		try {
			const res = await api.signUp(form);
			console.log(res);
			alert("Sucesso ;) ");
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<h1>ProduApp</h1>
			<form onSubmit={handleSubmit}>
				<Input
					placeholder="Nome"
					type="text"
					value={form.name}
					name="name"
					onChange={handleChange}
				/>
				<Input
					placeholder="E-mail"
					type="text"
					value={form.email}
					name="email"
					onChange={handleChange}
				/>
				<Input
					placeholder="ascCode"
					type="text"
					value={form.ascCode}
					name="ascCode"
					onChange={handleChange}
				/>
				<Input
					placeholder="Password"
					type="text"
					value={form.password}
					name="password"
					onChange={handleChange}
				/>
				<Button type="submit">Registrar</Button>
			</form>

			<RouterLink to="/">Logar</RouterLink>
		</>
	);
};

export default SignupPage;
