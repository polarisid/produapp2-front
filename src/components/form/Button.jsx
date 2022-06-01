import styled from "styled-components";

export default function Button({ children, ...props }) {
	return <StyledMuiButton {...props}>{children}</StyledMuiButton>;
}

const StyledMuiButton = styled.button`
	margin-top: 8px !important;
`;
