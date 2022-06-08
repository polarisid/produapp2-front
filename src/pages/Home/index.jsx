import api from "../../services/api";
import styled from "styled-components";
import { useState, useEffect } from "react";
import CardBox from "../../components/workspace/CardBox";
import CardRectangle from "../../components/workspace/CardRectangle";
import TopBar from "../../components/TopBar";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import jwt_decode from "jwt-decode";

const HomePage = () => {
	const [newItem, setNewItem] = useState({ os: "", model: "" });
	const [search, setSearch] = useState({ os: "" });
	const navigate = useNavigate();
	const { token } = useAuth();
	const [workspaces, setWorkspaces] = useState(false);
	const [pendings, setPendings] = useState(false);
	const [opens, setOpens] = useState(false);
	useEffect(() => {
		if (!token) {
			navigate("/");
		}
		var user = jwt_decode(token);
		if (user.role === "ADMIN") navigate("/admin/home");
		if (user.role === "OQC") navigate("/oqc/home");
		try {
			async function getData() {
				const items = await api.getWorkpace(token);
				setOpens(
					items.data.filter(
						(item) =>
							item.status === "Avaliation" ||
							item.status === "InRepair" ||
							item.status === "OQCFail" ||
							item.status === "ConfirmedSaw" ||
							item.status === "ConfirmedCost" ||
							item.status === "ConfirmedParts" ||
							item.status === "TechnicalAdvice"
					)
				);
				// setPendings(
				// 	items.data.filter(
				// 		(item) =>
				// 			item.status !== "Avaliation" &&
				// 			item.status !== "InRepair" &&
				// 			item.status !== "OQCFail"
				// 	)
				// );
			}

			getData();
		} catch {
			console.log("erro");
		}
	}, [workspaces]);

	async function handleSearchOs(e) {
		e.preventDefault();
		try {
			const itemsPending = await api.searchItemByOs(token, search.os);
			setPendings(itemsPending.data);
			console.log(itemsPending.data);
			setSearch({ os: "" });
		} catch {
			console.log("erro");
		}
	}
	async function handleSubmit(e) {
		e.preventDefault();
		console.log(newItem);
		try {
			const res = await api.createItem(newItem, token);
			setNewItem({ os: "", model: "" });
			setWorkspaces(!workspaces);
		} catch (err) {
			console.log(err);
			alert(err.response.data.error);
		}
	}

	return (
		<>
			<TopBar />
			{!opens ? (
				<Container>
					<div className="loading">Carregando...</div>
				</Container>
			) : (
				<>
					<Container>
						<section className="formSection">
							<p>Avaliações e reparos</p>
							<form onSubmit={handleSubmit}>
								<input
									placeholder="Os"
									type="number"
									required
									value={newItem.os}
									name="os"
									onChange={(e) =>
										setNewItem({ ...newItem, [e.target.name]: e.target.value })
									}
								/>
								<input
									placeholder="Modelo"
									value={newItem.model}
									name="model"
									required
									onChange={(e) =>
										setNewItem({ ...newItem, [e.target.name]: e.target.value })
									}
								/>
								<button type="submit">Adicionar</button>
							</form>
						</section>

						<div className="divider"></div>
						<section className="avaliations">
							{opens ? (
								opens.map((item, key) => (
									<CardBox
										key={key}
										setWorkspaces={setWorkspaces}
										workspaces={workspaces}
										id={item.id}
										os={item.os}
										model={item.model}
										status={item.status}
										createTime={item.createTime}
										elapsedTime={item.elapsedTime}
										updateTime={item.updateTime}
									/>
								))
							) : (
								<></>
							)}
						</section>
						<section className="formSection">
							<p>Pendentes</p>
							<form onSubmit={handleSearchOs}>
								<input
									placeholder="Os"
									type="number"
									required
									value={search.os}
									name="os"
									onChange={(e) =>
										setSearch({ ...search, [e.target.name]: e.target.value })
									}
								/>

								<button type="submit">Pesquisar</button>
							</form>
						</section>

						<div className="divider"></div>
						<section className="pendings">
							{pendings ? (
								pendings.map((item, key) => (
									<CardRectangle
										userChanged={item.userChanged}
										key={key}
										setWorkspaces={setWorkspaces}
										workspaces={workspaces}
										id={item.id}
										os={item.os}
										model={item.model}
										status={item.status}
										createTime={item.createTime}
										// elapsedTime={item.elapsedTime}
									/>
								))
							) : (
								<></>
							)}
						</section>
					</Container>
				</>
			)}
		</>
	);
};

const Container = styled.div`
	background-color: #000;
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
	button {
		background-color: #b8b8b8;
		border-radius: 10px;
		width: 100px;
		height: 28px;
		border: none;
		color: #000;
		font-size: 14px;
		font-weight: bold;
		cursor: pointer;
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
export default HomePage;
