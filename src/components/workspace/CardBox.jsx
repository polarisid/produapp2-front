import styled from "styled-components";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import dayjs from "dayjs";
import { useState } from "react";

export default function CardBox(props) {
	const { token } = useAuth();
	const { workspaces, setWorkspaces } = props;
	const [isLoading, setIsLoading] = useState(false);
	const [refresh, setRefresh] = useState(false);

	async function handleChangeStatus(e) {
		setIsLoading(true);
		try {
			await api.changeStatus(token, e.target.id, {
				status: e.target.value.toString(),
			});
			setWorkspaces(!workspaces);
			setIsLoading(false);
		} catch (err) {
			console.log(err.toJSON());
		}
	}


	setInterval(() => {
		setRefresh(!refresh);
	}, 1000);


	return (
		<StyledDiv>
			<h1>
				<b>OS:</b>
				{props.os}
			</h1>
			<h1>
				<b>Modelo:</b>
				{props.model}
			</h1>
			<div className="flex">
				<h2>
					<b>Status:</b>
				</h2>
				<div className="select-dropdown">
					{isLoading ? (
						<h1>Carregando</h1>
					) : (
						<select
							name="hall"
							id={props.id}
							value={props.status}
							onChange={handleChangeStatus}
						>
							<option value="Pending">Pendencia</option>
							<option value="TechnicalAdvice">Parecer técnico</option>
							<option value="ConfirmedCost">Confirmado-Orçamento</option>
							<option value="ConfirmedParts">Confirmado-Peças</option>
							<option value="ConfirmedSaw">Confirmado-SAW</option>
							<option value="Finished">Finalizado</option>
							<option disabled value="Avaliation">
								Avaliação/Reparo
							</option>
							<option disabled value="OQCFail">
								OQC FAIL
							</option>
						</select>
					)}
				</div>
			</div>
			<h1>
				<b>Entrada</b> {dayjs(props.createTime).format("HH:mm")} -{" "}
				{dayjs(props.createTime).format("DD/MM")}
			</h1>

			<h1>
				<b>Tempo: </b>
				{props.updateTime
					? Math.floor(
							dayjs(new Date()).diff(props.createTime, "minutes") / 60
					  ) +
					  "h" +
					  (dayjs(new Date()).diff(props.createTime, "minutes") % 60) +
					  "m"
					: "0"}
			</h1>
		</StyledDiv>
	);
}

const StyledDiv = styled.div`
	div.flex {
		display: flex;
		align-items: center;
		margin-top: 10px;
		h2 {
			font-size: 18px;
		}
	}
	color: #000;

	.select-dropdown {
		background-color: #f5ffd1;
		border-radius: 4px;
	}
	.select-dropdown select {
		font-size: 1rem;
		font-weight: normal;
		min-width: 100%;
		border: none;
		background-color: transparent;
		/* -webkit-appearance: none; */
		/* -moz-appearance: none; */
		/* appearance: none; */
		transition: all 1s ease;
	}
	/* .select-dropdown select:hover {
		background: #2b2b2b;
		color: #ffffff;
		/* font-weight: 900; */
	//} *///

	h1 {
		font-size: 18px;
		margin-top: 10px;
	}
	b {
		font-weight: 600;
		margin-right: 20px;
	}
	font-size: 08px;
	background-color: #e7ff90;
	border-radius: 4px;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
	padding: 16px;
	margin-bottom: 16px;
	width: 300px;
`;
