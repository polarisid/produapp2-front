import api from "../../services/api";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import jwt_decode from "jwt-decode";
import TopBarAdmin from "../../components/TopBarAdmin";
import dayjs from "dayjs";

const AdminManagement = () => {
	return (
		<>
			<TopBarAdmin />
			<Container>
				<div className="flex">
					<div className="left-box">
						<div className="top-menu">
							<h1>Usuários</h1>
							<table className="fl-table">
								<thead>
									<tr>
										<th>Nome</th>
										<th>Email</th>
										<th>Asc</th>
										<th>Job</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Daniel</td>
										<td>dani@gmail.com</td>
										<td>SLZ5286953</td>
										<td>user</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className="divider"></div>
					</div>
					<div className="right-box"></div>
				</div>
			</Container>
		</>
	);
};

const Container = styled.div`
	background-color: #000000;
	color: #000000;
	padding-top: 90px;
	height: 100vh;
	overflow-x: hidden;
	.flex {
		display: flex;
		width: 100%;
	}
	div.divider {
		width: 100%;
		height: 1px;
		background-color: #585858;
		margin: 10px 0;
	}
	.top-menu {
		color: #ffffff;
		font-size: 16px;
		display: flex;
		select {
			margin-left: 10px;
			font-size: 16px;
			background-color: #414141;
			font-weight: 600;
			color: #fff;
			border: none;
			border-radius: 10px;
		}
		margin: 0px 10px;
	}
`;

export default AdminManagement;
