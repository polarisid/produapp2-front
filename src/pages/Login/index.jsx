import api from "../../services/api";
import { useState, useEffect } from "react";
import Input from "../../components/form/Input";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import styled from "styled-components";
import jwt_decode from "jwt-decode";
import { keyframes } from "styled-components";
import ModalComponent from "../../components/Modal/index";

const LoginPage = () => {
	const navigate = useNavigate();
	const { token, signIn } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
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

			var user = jwt_decode(res.data.token);
			if (user.role === "USER") navigate("/home");
			if (user.role === "ADMIN") navigate("/admin/home");
			if (user.role === "OQC") navigate("/oqc/home");
		} catch (err) {
			setIsLoading(false);
			console.log(err.response.data);
			console.log(err);
			handleOpen();
		}
	};

	return (
		<Container>
			<ModalComponent
				title="Ocorreu um erro"
				open={open}
				handleClose={handleClose}
				description="Verifique seu Email e Senha! caso persista entre em contato com o suporte!"
			/>
			<h1>ProduApp</h1>

			<p>
				<a href="/">powered by Daniel</a>
			</p>
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
				<button
					type="submit"
					disabled={isLoading}
					className="custom-btn btn-11"
				>
					{isLoading ? "Carregando..." : "Entrar"}
				</button>
			</form>

			<RouterLink disabled to="/signup">
				Criar conta
			</RouterLink>
		</Container>
	);
};
const shiny = keyframes`

	0% {
		-webkit-transform: scale(0) rotate(45deg);
		opacity: 0;
	}
	80% {
		-webkit-transform: scale(0) rotate(45deg);
		opacity: 0.5;
	}
	81% {
		-webkit-transform: scale(4) rotate(45deg);
		opacity: 1;
	}
	100% {
		-webkit-transform: scale(50) rotate(45deg);
		opacity: 0;
	}

`;

const shine = keyframes`
		

  0% {
    background-position-x: -500%;
  }
  100% {
    background-position-x: 500%;
  }
	
`;

const underline = keyframes`
	100% {
		width: 100%;
	};`;
const slideIn = keyframes`
	100% {
		transform: translateY(0px);
		opacity: 1;
	}
	`;

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
	background-color: #242424;
	form {
		display: flex;
		flex-direction: column;
		transform: translateY(1000px);
		animation: 0.5s ${slideIn} ease-in-out forwards 1s;
	}
	.custom-btn {
		font-size: 16px;
		width: 100%;
		height: 40px;
		padding: 10px 25px;
		border: 2px solid #000;
		border-radius: 10px;
		font-weight: 900;
		background: transparent;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		display: inline-block;
	}
	.btn-11 {
		overflow: hidden;
		transition: all 0.3s ease;
		background: #ffffff;
	}
	.btn-11:hover {
		background: #000000;
		color: #fff;
	}
	.btn-11:before {
		position: absolute;
		content: "";
		display: inline-block;
		top: -180px;
		left: 0;
		width: 30px;
		height: 100%;
		background-color: #7c7c7c;
		animation: ${shiny} 3s ease-in-out infinite;
	}
	.btn-11:active {
		box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.3),
			-4px -4px 6px 0 rgba(116, 125, 136, 0.2),
			inset -4px -4px 6px 0 rgba(255, 255, 255, 0.2),
			inset 4px 4px 6px 0 rgba(0, 0, 0, 0.2);
	}

	a {
		text-decoration: none;
		color: inherit;
		font-size: 8px;
	}

	p {
		font-weight: 700;
		text-align: center;
		font-size: 8px;
		text-transform: uppercase;
		background: linear-gradient(90deg, #000, #fff, #ffffff);
		letter-spacing: 5px;
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		background-repeat: no-repeat;
		background-size: 80%;
		animation: ${shine} 1.5s linear infinite;
		position: relative;
	}

	h1 {
		font-size: 40px;
		transform: translateY(-600px);
		animation: 1s ${slideIn} ease-in-out forwards 1s;
		z-index: 10;
		opacity: 0;
		position: relative;
	}

	h1::before {
		content: "";
		width: 0%;
		height: 76px;
		position: absolute;
		bottom: -10px;
		animation: 1s ${underline} ease-in-out forwards 2s;
		mix-blend-mode: screen;
	}
	form::before {
		content: "";
		width: 0%;
		height: 76px;
		position: absolute;
		bottom: -10px;
		animation: 0.8s ${underline} ease-in-out forwards 1s;
		mix-blend-mode: screen;
	}
`;
export default LoginPage;
