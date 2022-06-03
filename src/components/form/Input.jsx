import styled from "styled-components";

export default function Input({ ...props }) {
	return <StyledInput {...props} />;
}

const StyledInput = styled.input`
	all: unset;
	box-sizing: border-box;
	font-family: "Lexend Deca", sans-serif;
	margin-bottom: 10px;
	width: 100%;

	color: #000;
	background: #ffffff;
	padding: 10px;
	border: 1px solid rgba(120, 177, 89, 0.25);
	border-radius: 12px;
	box-shadow: 0px 4px 24px rgba(120, 177, 89, 0.12);

	::placeholder {
		color: #9c9c9c;
		font-family: "Lexend Deca", sans-serif;
	}
`;
