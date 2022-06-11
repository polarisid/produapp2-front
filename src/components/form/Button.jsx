import styled, { keyframes } from "styled-components";

export default function Button({ children, ...props }) {
	return (
		<StyledMuiButton {...props}>
			<p>{children}</p>
		</StyledMuiButton>
	);
}
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
const StyledMuiButton = styled.button`
	background-color: #ffffff;
	border-radius: 10px;
	width: 100px;
	height: 28px;
	border: none;
	color: #000;
	font-size: 14px;
	/* all: unset; */
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	/* width: 100%;
	height: 20px; */
	border: 1px solid #000;
	border-radius: 10px;
	font-weight: 900;
	cursor: pointer;
	transition: all 0.3s ease;
	position: relative;

	overflow: hidden;
	transition: all 0.3s ease;

	:hover {
		background: #000000;
		color: #fff;
	}
`;
