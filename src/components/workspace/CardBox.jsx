import styled from "styled-components";
import { useState } from "react";

export default function CardBox(props) {
	const [state, setState] = useState(0);
	// setInterval(function () {
	// 	setState(state + 1);
	// }, 1000);
	return (
		<StyledDiv>
			<h2>OS:{props.os}</h2>
			<h2>Modelo:{props.model}</h2>
			<h2>Status: {props.status}</h2>
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
