import styled from "styled-components";
import { useState, useEffect } from "react";

import { useJwt } from "react-jwt";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
export default function TopBar() {
	const navigate = useNavigate();
	const { signOut } = useAuth();

	async function handleLogout() {
		signOut();
		navigate("/");
	}

	return (
		<StyledDiv>
			<h1>ProduApp 2.0</h1>
			<div className="rightContent">
				<h1 onClick={() => navigate("/home")}>Home</h1>
				<h1 onClick={() => alert("Em breve")}>Perfil</h1>
				<h1 onClick={handleLogout}>Sair</h1>
			</div>
		</StyledDiv>
	);
}

const StyledDiv = styled.div`
	color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0px 16px;
	height: 64px;
	background-color: #1a1a1a;
	box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
		0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
	h1 {
		font-size: 24px;
		font-weight: bold;
		color: #ffffff;
		cursor: pointer;
		transition: all 0.3s ease;
	}
	h1:hover {
		text-shadow: 0 0 4px #ffffff;
		color: #ffffff;
	}

	.rightContent {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
	}
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
`;
