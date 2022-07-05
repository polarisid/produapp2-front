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
		overflow-x: auto;
	}
	section.avaliations::-webkit-scrollbar {
		width: 06px; /* width of the entire scrollbar */
		height: 08px; /* height of the entire scrollbar */
	}

	section.avaliations::-webkit-scrollbar-track {
		background: #242424; /* color of the tracking area */
	}

	section.avaliations::-webkit-scrollbar-thumb {
		background-color: #585858; /* color of the scroll thumb */
		border-radius: 20px; /* roundness of the scroll thumb */
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
