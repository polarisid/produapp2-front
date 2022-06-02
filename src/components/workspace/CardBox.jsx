import styled from "styled-components";
import { useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";

export default function CardBox(props) {
	// const [state, setState] = useState({ id: props.id, status: props.status });
	const { token } = useAuth();
	const { workspaces, setWorkspaces } = props;

	async function handleChangeStatus(e) {
		try {
			await api.changeStatus(token, e.target.id, {
				status: e.target.value.toString(),
			});
			// setState({ id: e.target.id, status: e.target.value });
			setWorkspaces(!workspaces);
		} catch (err) {
			console.log(err.toJSON());
		}
	}

	return (
		<StyledDiv>
			<h2>OS:{props.os}</h2>
			<h2>Modelo:{props.model}</h2>
			<select
				name="hall"
				id={props.id}
				value={props.status}
				onChange={handleChangeStatus}
			>
				<option value="Avaliation">Avaliação</option>
				<option value="Finished">Finalizado</option>
				<option disabled value="OQCFail">
					OQC FAIL
				</option>
				<option value="InRepair">Em Reparo</option>
				<option value="PendingOthers">Pendencia Outros</option>
				<option value="PendingParts">Pendencia Peças</option>
				<option value="PendingCost">Pendencia Orçamento</option>
				<option value="PendingSaw">Pendencia Saw</option>
			</select>
			<h2>Entrada: {props.entrada}</h2>
			<h2>Tempo: {props.elapsedTime}</h2>
		</StyledDiv>
	);
}

const StyledDiv = styled.div`
	font-size: 08px;
	background-color: #e7ff90;
	border-radius: 4px;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
	padding: 16px;
	margin-bottom: 16px;
	width: 200px;
`;
