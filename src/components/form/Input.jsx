import styled from "styled-components";

export default function Input({ ...props }) {
	return <StyledInput {...props} />;
}

const StyledInput = styled.input`
	margin-top: 8px !important;
`;
