import api from "../../services/api";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import jwt_decode from "jwt-decode";
import TopBarAdmin from "../../components/TopBarAdmin";
import dayjs from "dayjs";
const AdminReports = () => {
	const { token } = useAuth();
	const [asc, setAsc] = useState("");
	const [historic, setHistoric] = useState([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function handleChange(e) {
		e.preventDefault();
		try {
			setLoading(true);
			setAsc(e.target.value);
			const result = await api.getHistoric(e.target.value, token);

			setHistoric(
				result.data.filter(
					(item) =>
						item.status === "Avaliation" ||
						item.status === "ConfirmedSaw" ||
						item.status === "ConfirmedParts" ||
						item.status === "ConfirmedCost" ||
						item.status === "OQCFail"
				)
			);

			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
			console.log(err.toJSON());
		}
	}

	useEffect(() => {
		if (!token) {
			navigate("/");
		}
		var user = jwt_decode(token);
		if (user.role === "USER") navigate("/home");
	}, []);

	return (
		<>
			<TopBarAdmin />
			{loading ? (
				<Container>Carregando</Container>
			) : (
				<Container>
					<div className="top-menu">
						<h1>Volume geral de Produção - </h1>
						<select value={asc} onChange={handleChange}>
							<option value="">Selecione uma Asc</option>
							<option value="AJU3198122">AJU3198122</option>
							<option value="SLZ5286953">SLZ5286953</option>
						</select>
					</div>
					<div className="table-wrapper">
						<table className="fl-table">
							<thead>
								<tr>
									<th>Nome</th>
									<th>Avaliações</th>
									<th>Trocas</th>
									<th>Finalizados</th>
								</tr>
							</thead>
						</table>
					</div>

					<div className="top-menu">
						<h1>Planilha do Dia - Histórico e produtividade: </h1>
						<select value={asc} onChange={handleChange}>
							<option value="">Selecione uma Asc</option>
							<option value="AJU3198122">AJU3198122</option>
							<option value="SLZ5286953">SLZ5286953</option>
						</select>
					</div>
					<div className="table-wrapper">
						<table className="fl-table">
							<thead>
								<tr>
									<th>OS</th>
									<th>Modelo</th>
									<th>Técnico</th>
									<th>Status</th>
									<th>Horário</th>
									<th>StatusFinal</th>
									<th>HorárioFinal</th>
								</tr>
							</thead>
							<tbody>
								{historic.map((item, key) => (
									<tr key={key}>
										<td>{item.item.os}</td>
										<td>{item.item.model}</td>
										<td>{item.user.name}</td>
										<td>{item.status}</td>
										<td>{dayjs(item.createdAt).format("HH:mm:ss")}</td>
										<td>{item.item.status}</td>
										<td>{dayjs(item.item.updateTime).format("HH:mm:ss")}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Container>
			)}
		</>
	);
};

export default AdminReports;
const Container = styled.div`
	background-color: #000000;
	color: #000000;
	padding-top: 90px;
	height: 100vh;
	overflow-x: hidden;
	.top-menu {
		color: #ffffff;
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

	* {
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
	}
	body {
		font-family: Helvetica;
		-webkit-font-smoothing: antialiased;
		background: rgba(71, 147, 227, 1);
	}
	h2 {
		text-align: center;
		font-size: 18px;
		text-transform: uppercase;
		letter-spacing: 1px;
		color: white;
		padding: 30px 0;
	}

	/* Table Styles */

	.table-wrapper {
		margin: 10px 70px 70px;
		box-shadow: 0px 35px 50px rgba(0, 0, 0, 0.2);
	}

	.fl-table {
		border-radius: 5px;
		font-size: 12px;
		font-weight: normal;
		border: none;
		border-collapse: collapse;
		width: 100%;
		max-width: 100%;
		white-space: nowrap;
		background-color: white;
	}

	.fl-table td,
	.fl-table th {
		text-align: center;
		padding: 8px;
	}

	.fl-table td {
		border-right: 1px solid #f8f8f8;
		font-size: 12px;
	}

	.fl-table thead th {
		color: #ffffff;
		background: #4b4b4b;
	}

	.fl-table thead th:nth-child(odd) {
		color: #ffffff;
		background: #363636;
	}

	.fl-table tr:nth-child(even) {
		background: #f8f8f8;
	}

	/* Responsive */

	@media (max-width: 767px) {
		.fl-table {
			display: block;
			width: 100%;
		}
		.table-wrapper:before {
			content: "Scroll horizontally >";
			display: block;
			text-align: right;
			font-size: 11px;
			color: white;
			padding: 0 0 10px;
		}
		.fl-table thead,
		.fl-table tbody,
		.fl-table thead th {
			display: block;
		}
		.fl-table thead th:last-child {
			border-bottom: none;
		}
		.fl-table thead {
			float: left;
		}
		.fl-table tbody {
			width: auto;
			position: relative;
			overflow-x: auto;
		}
		.fl-table td,
		.fl-table th {
			padding: 20px 0.625em 0.625em 0.625em;
			height: 60px;
			vertical-align: middle;
			box-sizing: border-box;
			overflow-x: hidden;
			overflow-y: auto;
			width: 120px;
			font-size: 13px;
			text-overflow: ellipsis;
		}
		.fl-table thead th {
			text-align: left;
			border-bottom: 1px solid #f7f7f9;
		}
		.fl-table tbody tr {
			display: table-cell;
		}
		.fl-table tbody tr:nth-child(odd) {
			background: none;
		}
		.fl-table tr:nth-child(even) {
			background: transparent;
		}
		.fl-table tr td:nth-child(odd) {
			background: #f8f8f8;
			border-right: 1px solid #e6e4e4;
		}
		.fl-table tr td:nth-child(even) {
			border-right: 1px solid #e6e4e4;
		}
		.fl-table tbody td {
			display: block;
			text-align: center;
		}
	}
`;
