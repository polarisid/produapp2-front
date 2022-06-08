import styled from "styled-components";

export default function MiniCard(props) {
	const { os, model, tecName } = props;
	return (
		<MINICARD>
			<h1>{os}</h1>
			<h1>{model}</h1>
			<h1>{tecName}</h1>
		</MINICARD>
	);
}

const MINICARD = styled.div`
	width: 100%;
	border-radius: 10px;
	border: 2px solid rgba(155, 0, 0, 0.5);
`;
