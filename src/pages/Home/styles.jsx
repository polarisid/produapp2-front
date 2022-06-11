import styled from "styled-components";
export const Container = styled.div`
	background-color: #242424;
	color: #fff;
	padding-top: 90px;
	height: 100vh;
	.loading {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: auto auto;
	}
	section {
		padding: 0px 20px;
	}
	p {
		font-weight: 600;
	}
	form {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	input {
		height: 30px;
		border-radius: 10px;
		width: 150px;
	}

	section.avaliations {
		display: flex;
		gap: 10px;
	}
	div.divider {
		width: 100%;
		height: 1px;
		background-color: #585858;
		margin: 10px 0;
	}
	section.formSection {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
`;
