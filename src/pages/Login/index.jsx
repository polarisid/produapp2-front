// import TextField from "@mui/material/TextField";
import api from "../../services/api";
import { useState, useEffect } from "react";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import styled from "styled-components";
import jwt_decode from "jwt-decode";

const LoginPage = () => {
	const navigate = useNavigate();
	const { token, signIn } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	useEffect(() => {
		if (token) {
			navigate("/home");
		}
	}, []);
	function handleChange(event) {
		setForm({ ...form, [event.target.name]: event.target.value });
	}
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		console.log(form);
		try {
			const res = await api.signIn(form);
			console.log(res);
			signIn(res.data.token);
			alert("Sucesso ;) ");
			var user = jwt_decode(res.data.token);
			if (user.role === "USER") navigate("/home");
		} catch (err) {
			setIsLoading(false);
			alert(err.response.data);
			console.log(err.response.data);
			console.log(err);
		}
	};

	return (
		<Container>
			<h1>ProduApp 2.0</h1>

			<form onSubmit={handleSubmit}>
				<Input
					required
					placeholder="E-mail"
					type="text"
					value={form.email}
					name="email"
					onChange={handleChange}
				/>
				<Input
					required
					placeholder="Password"
					type="password"
					value={form.password}
					name="password"
					onChange={handleChange}
				/>
				<Button type="submit" disabled={isLoading}>
					{isLoading ? "Carregando..." : "Entrar"}
				</Button>
			</form>

			<RouterLink disabled to="/signup">
				Criar conta
			</RouterLink>
		</Container>
	);
};
const Container = styled.div`
	h1 {
		font-size: 50px;
		color: #ffffff;
	}
	gap: 20px;
	display: flex;
	min-height: 100vh;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #000;
	form {
		display: flex;
		flex-direction: column;
	}
`;
export default LoginPage;
