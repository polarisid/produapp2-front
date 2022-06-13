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
	const [workspaces, setWorkspaces] = useState(true);
	const [asc, setAsc] = useState("");
	const [avaliations, setAvaliations] = useState([]);
	const [trocas, setTrocas] = useState([]);
	const [saw, setSaw] = useState([]);
	const [parecer, setParecer] = useState([]);
	setInterval(() => {
		setWorkspaces(!workspaces);
	}, 2000);

	const navigate = useNavigate();
	useEffect(() => {
		if (!token) {
			navigate("/");
		}
		var user = jwt_decode(token);
		if (user.role === "USER") navigate("/home");
	}, [workspaces]);

	async function handleChange(e) {
		e.preventDefault();
		try {
			setAsc(e.target.value);
			const result = await api.getAdminDashboard(e.target.value, token);

			console.log(result.data);

			setAvaliations(
				result.data.filter(
					(item) => item.status === "Avaliation" || item.status === "OQCFail"
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
				<div className="top-menu">
					<h1>Monitoramento em Tempo real: </h1>
					<select value={asc} onChange={handleChange}>
						<option value="">Selecione uma Asc</option>
						<option value="AJU3198122">AJU3198122</option>
						<option value="SLZ5286953">SLZ5286953</option>
					</select>
				</div>
				<div className="divider"></div>
				<section className="actually">
					<div className="miniCard">
						<div className="title">
							<h1>Avaliações/Reparos do Dia</h1>
							{avaliations.length > 0 && <h2>{avaliations.length}</h2>}
						</div>

						{avaliations.length > 0 ? (
							avaliations.map((item) => (
								<MiniCard
									key={item.id}
									os={item.os}
									model={item.model}
									tecName={item.userChanged.name}
									createTime={item.createTime}
									elapsedTime={item.elapsedTime}
									updateTime={item.updateTime}
								/>
							))
						) : (
							<div className="zerado">
								<h1>Zerado</h1>
							</div>
						)}
					</div>
					<div className="miniCard">
						<div className="title">
							<h1>Trocas de peças (Orçamento e pendencia)</h1>
							{trocas.length > 0 && <h2>{trocas.length}</h2>}
						</div>
						{trocas.length > 0 ? (
							trocas.map((item) => (
								<MiniCard
									key={item.id}
									os={item.os}
									model={item.model}
									tecName={item.userChanged.name}
									elapsedTime={item.elapsedTime}
									updateTime={item.updateTime}
									createTime={item.createTime}
								/>
							))
						) : (
							<div className="zerado">
								<h1>Zerado</h1>
							</div>
						)}
					</div>
					<div className="miniCard">
						<div className="title">
							<h1>SAW Respondido</h1>
							{saw.length > 0 && <h2>{saw.length}</h2>}
						</div>
						{saw.length > 0 ? (
							saw.map((item) => (
								<MiniCard
									key={item.id}
									os={item.os}
									model={item.model}
									tecName={item.userChanged.name}
									elapsedTime={item.elapsedTime}
									updateTime={item.updateTime}
									createTime={item.createTime}
								/>
							))
						) : (
							<div className="zerado">
								<h1>Zerado</h1>
							</div>
						)}
					</div>
					<div className="miniCard">
						<div className="title">
							<h1>Parecer Técnico</h1>
							{parecer.length > 0 && <h2>{parecer.length}</h2>}
						</div>
						{parecer.length > 0 ? (
							parecer.map((item) => (
								<MiniCard
									key={item.id}
									os={item.os}
									model={item.model}
									tecName={item.userChanged.name}
									elapsedTime={item.elapsedTime}
									updateTime={item.updateTime}
									createTime={item.createTime}
								/>
							))
						) : (
							<div className="zerado">
								<h1>Zerado</h1>
							</div>
						)}
					</div>
				</section>
			</Container>
		</>
	);
};

export default AdminHome;

const Container = styled.div`
	box-sizing: border-box;
	overflow-x: hidden;
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
	div.title {
		border-radius: 10px;
		background: rgb(0, 0, 0);
		background: linear-gradient(
			0deg,
			rgba(0, 0, 0, 1) 0%,
			rgba(116, 116, 116, 1) 100%
		);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 50px;
		border: 1px solid rgba(116, 116, 116, 1);
	}
	div.zerado {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50px;
	}
	div.miniCard {
		box-sizing: border-box;
		border-radius: 10px;
		border: 2px solid rgba(255, 255, 255, 0.5);
		width: 100%;
		background: rgba(255, 255, 0, 0);
		border-radius: 16px;
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(4.4px);
		-webkit-backdrop-filter: blur(4.4px);
		border: 1px solid rgba(255, 255, 255, 1);
	}

	div.flex {
		gap: 4px;
		display: flex;
	}
	.top-menu {
		font-size: 16px;
		display: flex;
		select {
			margin-left: 10px;
			font-size: 16px;
			background-color: #414141;
			font-weight: 600;
			color: #fff;
			border: none;
			border-radius: 10px;
		}
		margin: 0px 10px;
	}
	section.actually {
		display: flex;
		@media screen and (max-width: 600px) {
			flex-direction: column;
		}
	}
`;
