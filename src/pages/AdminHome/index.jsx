import api from "../../services/api";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import jwt_decode from "jwt-decode";
import TopBarAdmin from "../../components/TopBarAdmin";
import MiniCard from "../../components/adminWorkspace/miniCard";
const AdminHome = () => {
	const { token } = useAuth();
	const [asc, setAsc] = useState("");
	const [avaliations, setAvaliations] = useState([]);
	const [trocas, setTrocas] = useState([]);
	const [saw, setSaw] = useState([]);
	const [parecer, setParecer] = useState([]);

	const navigate = useNavigate();
	useEffect(() => {
		if (!token) {
			navigate("/");
		}
		var user = jwt_decode(token);
		if (user.role === "USER") navigate("/home");
	}, []);

	async function handleChange(e) {
		e.preventDefault();
		try {
			setAsc(e.target.value);
			const result = await api.getAdminDashboard(e.target.value, token);

			console.log(result.data);

			setAvaliations(
				result.data.filter(
					(item) =>
						item.status === "Avaliation" ||
						item.status === "InRepair" ||
						item.status === "OQCFail"
				)
			);
			setParecer(
				result.data.filter((item) => item.status === "TechnicalAdvice")
			);
			setSaw(result.data.filter((item) => item.status === "ConfirmedSaw"));
			setTrocas(
				result.data.filter(
					(item) =>
						item.status === "ConfirmedCost" || item.status === "ConfirmedParts"
				)
			);
		} catch (err) {
			console.log(err.toJSON());
		}
	}
	return (
		<>
			<TopBarAdmin />
			<Container>
				<div>
					<h1>Dashboard</h1>
					<select value={asc} onChange={handleChange}>
						<option value="">Selecione uma Asc</option>
						<option value="AJU3198122">AJU3198122</option>
						<option value="SLZ5286953">SLZ5286953</option>
					</select>
				</div>
				<div className="divider"></div>
				<section className="actually">
					<div className="miniCard">
						<h1>Avaliações Atuais</h1>
						{avaliations.length > 0 ? (
							avaliations.map((item) => (
								<MiniCard
									key={item.id}
									os={item.os}
									model={item.model}
									tecName={item.userChanged.name}
								/>
							))
						) : (
							<h1>Nothing</h1>
						)}
						{/* <MiniCard os="4163823678" model="Sm-A505GXZSWERSC" /> */}
					</div>
					<div className="miniCard">
						<h1>Trocas de Peças e Orçamento</h1>
						{trocas.length > 0 ? (
							trocas.map((item) => (
								<MiniCard
									key={item.id}
									os={item.os}
									model={item.model}
									tecName={item.userChanged.name}
								/>
							))
						) : (
							<h1>Nothing</h1>
						)}
					</div>
					<div className="miniCard">
						<h1>SAW Aprovado</h1>
						{saw.length > 0 ? (
							saw.map((item) => (
								<MiniCard
									key={item.id}
									os={item.os}
									model={item.model}
									tecName={item.userChanged.name}
								/>
							))
						) : (
							<h1>Nothing</h1>
						)}
					</div>
					<div className="miniCard">
						<h1>Parecer Técnico</h1>
						{parecer.length > 0 ? (
							parecer.map((item) => (
								<MiniCard
									key={item.id}
									os={item.os}
									model={item.model}
									tecName={item.userChanged.name}
								/>
							))
						) : (
							<h1>Nothing</h1>
						)}
					</div>
				</section>
			</Container>
		</>
	);
};

export default AdminHome;

const Container = styled.div`
	background-color: #000;
	color: #fff;
	padding-top: 90px;
	height: 100vh;
	div.divider {
		width: 100%;
		height: 1px;
		background-color: #585858;
		margin: 10px 0;
	}
	div.miniCard {
		border-radius: 10px;
		border: 2px solid rgba(255, 255, 255, 0.5);
		width: 40%;
	}
	div.miniCard-content {
		background-color: rgba(31, 31, 31, 0.5);
		margin-top: 8px;
	}

	div.flex {
		gap: 4px;
		display: flex;
	}
	section.actually {
		display: flex;
	}
`;
