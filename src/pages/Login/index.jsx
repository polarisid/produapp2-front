// import TextField from "@mui/material/TextField";
import api from "../../services/api";
import { useState } from "react";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const LoginPage = () => {
	const navigate = useNavigate();
	const { signIn } = useAuth();
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	function handleChange(event) {
		setForm({ ...form, [event.target.name]: event.target.value });
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(form);
		try {
			const res = await api.signIn(form);
			console.log(res);
			signIn(res.data.token);
			alert("Sucesso ;) ");
			navigate("/home");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<h1>ProduApp</h1>
			<form onSubmit={handleSubmit}>
				<Input
					placeholder="E-mail"
					type="text"
					value={form.email}
					name="email"
					onChange={handleChange}
				/>
				<Input
					placeholder="Password"
					type="text"
					value={form.password}
					name="password"
					onChange={handleChange}
				/>
				<Button type="submit">Login</Button>
			</form>

			<RouterLink to="/signup">Criar conta</RouterLink>
		</>
	);
};

export default LoginPage;
