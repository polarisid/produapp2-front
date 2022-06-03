import styled from "styled-components";

export default function Button({ children, ...props }) {
	return <StyledMuiButton {...props}>{children}</StyledMuiButton>;
}

const StyledMuiButton = styled.button`
	all: unset;
	box-sizing: border-box;
	cursor: pointer;

	width: 100%;

	font-style: normal;
	font-size: 14px;
	font-weight: 700;
	line-height: 18px;

	color: #000000;

	text-align: center;

	padding: 10px;

	background: #ffffff;
	border-radius: 12px;

	max-width: ${(props) => props.maxWidth || "initial"};
`;
